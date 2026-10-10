/*
 * The Pilgrim's Journey — game engine.
 * All content lives in /content; this file only runs the journey.
 */
(function () {
  'use strict';

  // ---------- Rules ----------
  const MAX_OIL = 10;
  const RULES = {
    // Family: a chapter can never be failed; quizzes and puzzles allow retries.
    family: { moralLoss: 2, quizLoss: 0, retry: true, restoreGain: 2, faithfulGain: 1, floor: 1 },
    // Teens & adults: one try; if the lamp runs dry the chapter is replayed.
    teen: { moralLoss: 4, quizLoss: 2, retry: false, restoreGain: 2, faithfulGain: 1, floor: 0 }
  };
  const MODE_NAMES = { family: 'Family (ages 5+)', teen: 'Teens & Adults' };
  const DEFAULT_TEAMS = ['Team Daniel', 'Team Esther', 'Team Joseph', 'Team Ruth'];
  const KIND_LABELS = { choice: '⚖️ Moral Choice', path: '🛤️ Choose the Path', quiz: '📜 Bible Puzzle', order: '🧩 Put It in Order' };
  const SAVE_KEY = 'pj-save-v1';
  const PREF_KEY = 'pj-prefs-v1';
  const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1

  const app = document.getElementById('app');
  const content = buildContent();
  let prefs = Object.assign({ muted: false, autoRead: true, charades: true }, loadJSON(PREF_KEY) || {});
  let state = loadJSON(SAVE_KEY);
  if (!validState(state)) state = null;
  else if (state.inChapter && !Array.isArray(state.inChapter.order)) state.inChapter = null;
  if (state && !Number.isInteger(state.turn)) state.turn = 0;
  if (state && !Number.isInteger(state.faithful)) state.faithful = 0;
  let ui = {};
  let timerId = null;

  // ---------- Small helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function storage() { try { return window.localStorage; } catch (e) { return null; } }
  function loadJSON(key) {
    try { const s = storage(); const v = s && s.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function saveJSON(key, value) { try { const s = storage(); if (s) s.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ } }
  function removeKey(key) { try { const s = storage(); if (s) s.removeItem(key); } catch (e) { /* ignore */ } }
  function persist() { if (state) saveJSON(SAVE_KEY, state); }
  function savePrefs() { saveJSON(PREF_KEY, prefs); }
  function rules() { return RULES[state.mode]; }
  function typeOf(item) { return item.type || 'choice'; }

  // ---------- Content loading & checking ----------
  function hasText(v) { return typeof v === 'string' && v.trim().length > 0; }

  function validate(c) {
    if (!c || typeof c !== 'object') return 'is empty';
    const t = typeOf(c);
    if (!KIND_LABELS[t]) return 'has an unknown type "' + t + '" (use choice, path, quiz or order)';
    if (c.verse && (!hasText(c.verse.ref) || !hasText(c.verse.text))) return 'has a verse that needs both "ref" and "text"';
    if (t === 'choice' || t === 'path') {
      if (!hasText(c.situation)) return 'needs a "situation"';
      if (!Array.isArray(c.choices) || c.choices.length < 2) return 'needs at least 2 "choices"';
      for (const ch of c.choices) {
        if (!ch || !hasText(ch.text)) return 'has a choice without "text"';
        if (typeof ch.faithful !== 'boolean') return 'has a choice where "faithful" is not true or false';
        if (!hasText(ch.result)) return 'has a choice without a "result"';
      }
      if (!c.choices.some(ch => ch.faithful)) return 'needs at least one choice with faithful: true';
    } else if (t === 'quiz') {
      if (!hasText(c.question)) return 'needs a "question"';
      if (!Array.isArray(c.options) || c.options.length < 2) return 'needs at least 2 "options"';
      if (c.options.some(o => !o || !hasText(o.text))) return 'has an option without "text"';
      if (c.options.filter(o => o.correct === true).length !== 1) return 'needs exactly one option with correct: true';
    } else if (t === 'order') {
      if (!hasText(c.question)) return 'needs a "question"';
      if (!Array.isArray(c.items) || c.items.length < 3) return 'needs at least 3 "items"';
      if (c.items.some(i => !hasText(i))) return 'has an empty item';
    }
    return null;
  }

  function buildContent() {
    const problems = (window.PJ.loadErrors || []).map(e => 'A file could not be read — check for a typing mistake: ' + e);
    const chapters = [];
    const add = (list, c, where) => {
      const err = validate(c);
      if (err) problems.push(where + ' ' + err + ' — skipped.');
      else list.push(c);
    };

    window.PJ.chapters.forEach((ch, ci) => {
      const label = 'Chapter "' + (ch && ch.id || ci + 1) + '"';
      if (!ch || !hasText(ch.id) || !hasText(ch.title)) { problems.push(label + ' needs an "id" and a "title" — skipped.'); return; }
      const out = Object.assign({}, ch, { family: [], teen: [] });
      out.key = String(ch.key || ch.id).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) || 'PILGRIM';
      out.short = ch.short || ch.title;
      out.symbol = ch.symbol || '⭐';
      out.intro = ch.intro || {};
      (ch.family || []).forEach((c, i) => add(out.family, c, label + ', family item ' + (i + 1)));
      (ch.teen || []).forEach((c, i) => add(out.teen, c, label + ', teen item ' + (i + 1)));
      (ch.both || []).forEach((c, i) => { add(out.family, c, label + ', both item ' + (i + 1)); add(out.teen, c, label + ', both item ' + (i + 1)); });
      chapters.push(out);
    });

    window.PJ.extras.forEach((d, i) => {
      const where = 'Your dilemma #' + (i + 1) + (d && hasText(d.situation) ? ' (“' + d.situation.slice(0, 40) + '…”)' : '');
      const target = d && chapters.find(c => c.id === d.chapter);
      if (!target) {
        problems.push(where + ' names chapter "' + (d && d.chapter) + '", which does not exist. Use one of: ' + chapters.map(c => c.id).join(', ') + '.');
        return;
      }
      const mode = d.mode || 'both';
      if (['family', 'teen', 'both'].indexOf(mode) < 0) { problems.push(where + ' has mode "' + mode + '" — use family, teen or both.'); return; }
      if (mode !== 'teen') add(target.family, d, where);
      if (mode !== 'family') add(target.teen, d, where);
    });

    const restoration = [];
    window.PJ.restoration.forEach((r, i) => add(restoration, Object.assign({ type: 'quiz' }, r), 'Restoration question ' + (i + 1)));

    const charades = { family: [], teen: [] };
    (window.PJ.charades || []).forEach((c, i) => {
      const where = 'Charade #' + (i + 1) + (c && hasText(c.answer) ? ' (“' + c.answer.slice(0, 40) + '”)' : '');
      if (!c || !hasText(c.act)) return problems.push(where + ' needs an "act" (what the actor acts out) — skipped.');
      if (!hasText(c.answer)) return problems.push(where + ' needs an "answer" (what the guessers should say) — skipped.');
      if (c.verse && (!hasText(c.verse.ref) || !hasText(c.verse.text))) return problems.push(where + ' has a verse that needs both "ref" and "text" — skipped.');
      const mode = c.mode || 'both';
      if (['family', 'teen', 'both'].indexOf(mode) < 0) return problems.push(where + ' has mode "' + mode + '" — use family, teen or both.');
      if (mode !== 'teen') charades.family.push(c);
      if (mode !== 'family') charades.teen.push(c);
    });

    chapters.forEach(ch => {
      if (!ch.family.length) problems.push('Chapter "' + ch.id + '" has no Family challenges.');
      if (!ch.teen.length) problems.push('Chapter "' + ch.id + '" has no Teens & Adults challenges.');
    });
    return { chapters, restoration, charades, problems: Array.from(new Set(problems)) };
  }

  function validState(s) {
    return !!s && typeof s === 'object' && RULES[s.mode] && Array.isArray(s.teams) && s.teams.length > 0 &&
      Number.isInteger(s.chapterIndex) && s.chapterIndex >= 0 && s.chapterIndex <= content.chapters.length;
  }

  // ---------- Save codes ----------
  // Code = chapter word + 3 characters of (faithful, chapter, mode) + 1 check character.
  function makeCode(mode, chapterIndex, faithful) {
    const f = Math.max(0, Math.min(199, faithful | 0));
    let n = (f * 16 + chapterIndex) * 2 + (mode === 'teen' ? 1 : 0);
    const check = CODE_ALPHABET[(n * 7 + 13) % 32];
    let s = '';
    for (let i = 0; i < 3; i++) { s = CODE_ALPHABET[n % 32] + s; n = Math.floor(n / 32); }
    const ch = content.chapters[chapterIndex];
    return (ch ? ch.key : 'VICTOR') + '-' + s + check;
  }
  function readCode(code) {
    const raw = String(code || '').toUpperCase().replace(/[^A-Z0-9-]/g, '');
    const part = raw.split('-').pop();
    if (!part || part.length !== 4) return null;
    let n = 0;
    for (let i = 0; i < 3; i++) { const v = CODE_ALPHABET.indexOf(part[i]); if (v < 0) return null; n = n * 32 + v; }
    if (CODE_ALPHABET[(n * 7 + 13) % 32] !== part[3]) return null;
    const mode = n % 2 ? 'teen' : 'family';
    const rest = Math.floor(n / 2);
    const chapterIndex = rest % 16;
    if (chapterIndex > content.chapters.length) return null;
    return { mode, chapterIndex, faithful: Math.floor(rest / 16) };
  }

  // ---------- Sound (made in the browser — nothing to download) ----------
  const Sound = (function () {
    let ctx = null;
    function audio() {
      if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }
    function note(freq, start, dur, type, vol) {
      const c = audio(); if (!c) return;
      const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + start;
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t); o.stop(t + dur + 0.05);
    }
    function play(seq, type, vol) {
      if (prefs.muted) return;
      try { seq.forEach(n => note(n[0], n[1], n[2], type, vol)); } catch (e) { /* audio unavailable */ }
    }
    return {
      good: () => play([[523, 0, 0.18], [659, 0.12, 0.18], [784, 0.24, 0.4]], 'triangle', 0.22),
      bad: () => play([[311, 0, 0.3], [233, 0.22, 0.5]], 'sine', 0.18),
      trumpet: () => play([[392, 0, 0.15], [392, 0.16, 0.15], [523, 0.32, 0.2], [659, 0.54, 0.2], [784, 0.76, 0.7]], 'sawtooth', 0.07),
      click: () => play([[880, 0, 0.05]], 'sine', 0.05)
    };
  })();

  // ---------- Read aloud ----------
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  }
  function stopSpeech() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
  function readScreen() {
    const parts = Array.from(app.querySelectorAll('[data-read]')).map(e => e.textContent.trim()).filter(Boolean);
    speak(parts.join('. '));
  }
  function autoRead() {
    if (state && state.mode === 'family' && prefs.autoRead) setTimeout(readScreen, 350);
  }

  // ---------- Rendering helpers ----------
  function show(html, theme) {
    stopSpeech();
    if (timerId) { clearInterval(timerId); timerId = null; }
    document.body.className = 'theme-' + theme;
    app.innerHTML = html;
    window.scrollTo(0, 0);
    const focus = app.querySelector('[data-focus]') || app.querySelector('.btn.primary');
    if (focus) focus.focus({ preventScroll: true });
  }
  function chapter(i) { return content.chapters[i == null ? state.chapterIndex : i]; }
  function current() {
    const ch = chapter();
    const ic = state.inChapter;
    const items = ch ? ch[state.mode] : [];
    const item = ic && ic.step < ic.order.length ? items[ic.order[ic.step]] : null;
    return { ch, ic, item };
  }
  function teamName(i) { return state.teams[(i == null ? state.turn : i) % state.teams.length]; }
  function lampMeter(oil) {
    const pct = Math.max(0, oil) / MAX_OIL * 100;
    return `<div class="lamp ${oil <= 3 ? 'low' : ''}" title="Lamp oil: ${oil} of ${MAX_OIL}" aria-label="Lamp oil ${oil} of ${MAX_OIL}">
      <span class="lamp-icon" aria-hidden="true">🪔</span>
      <div class="lamp-bar"><div class="lamp-fill" style="width:${pct}%"></div></div>
      <span class="lamp-num">${oil}</span></div>`;
  }
  function topbar(withLamp) {
    const ch = chapter();
    const ic = state.inChapter;
    return `<header class="topbar">
      <div class="tb-title">${ch ? esc(ch.symbol) + ' ' + esc(ch.title) : '📖 The Pilgrim’s Journey'}</div>
      ${withLamp && ic ? lampMeter(ic.oil) : ''}
      <div class="tb-tools">
        <button class="icon" data-act="read" title="Read aloud" aria-label="Read aloud">🔊</button>
        <button class="icon" data-act="mute" title="Sound on/off" aria-label="Sound on or off">${prefs.muted ? '🔇' : '🔔'}</button>
        <button class="icon" data-act="full" title="Full screen" aria-label="Full screen">⛶</button>
        <button class="icon" data-act="map" title="Journey map" aria-label="Journey map">🗺️</button>
      </div></header>`;
  }
  function verseBlock(v) {
    if (!v) return '';
    return `<blockquote class="verse"><p data-read>“${esc(v.text)}”</p><cite data-read>${esc(v.ref)} (KJV)</cite></blockquote>`;
  }
  function sparkBlock(text) {
    if (!hasText(text)) return '';
    return `<div class="spark"><b>💬 Spark — talk about it together</b><p data-read>${esc(text)}</p></div>`;
  }
  function optButtons(opts, labelOf, act) {
    return `<div class="opts">${opts.map((idx, n) =>
      `<button class="opt" data-act="${act}" data-i="${idx}"><span class="num">${n + 1}</span><span data-read>${esc(labelOf(idx))}</span></button>`).join('')}</div>`;
  }
  function stonesRow(count) {
    return content.chapters.slice(0, count).map(c => `<span title="${esc(c.title)}">${esc(c.symbol)}</span>`).join('');
  }

  // ---------- Screens ----------
  function renderTitle() {
    const canDownload = location.protocol === 'http:' || location.protocol === 'https:';
    show(`<main class="wrap center">
      <div class="brand">📖 Ignite Bible Games</div>
      <h1 class="title-big">The Pilgrim’s Journey</h1>
      <p class="subtitle">From Eden to the New Jerusalem — a family team adventure through Daniel, Revelation and the whole Bible.</p>
      <div class="card menu">
        ${state ? `<button class="btn primary" data-act="continue">▶ Continue the journey<small>${esc(saveSummary())}</small></button>` : ''}
        <button class="btn ${state ? '' : 'primary'}" data-act="newGame">✨ Start a new journey</button>
        <button class="btn" data-act="codeScreen">🔑 Enter a save code</button>
        <button class="btn" data-act="howTo">❓ How to play</button>
      </div>
      <div class="footer-tools">
        ${canDownload ? '<button class="link" data-act="download">⬇️ Download offline copy</button>' : ''}
        <button class="link" data-act="check">🛠 Check content (for leaders)</button>
        <button class="link" data-act="mute">${prefs.muted ? '🔇 Sound off' : '🔔 Sound on'}</button>
      </div>
      ${content.problems.length ? `<p class="warn">⚠️ ${content.problems.length} content problem${content.problems.length > 1 ? 's' : ''} found — open “Check content”.</p>` : ''}
    </main>`, 'title');
  }

  function saveSummary() {
    const ch = chapter(state.chapterIndex);
    return MODE_NAMES[state.mode] + ' · ' + (ch ? 'Chapter ' + (state.chapterIndex + 1) + ': ' + ch.short : 'Journey complete');
  }

  function renderHowTo() {
    show(`<main class="wrap"><div class="card stack">
      <h2>❓ How to play</h2>
      <p data-read>The Pilgrim’s Journey is a cooperative game: every team travels together from Eden to the New Jerusalem. Everyone wins together.</p>
      <ul class="stack" style="padding-left:1.2rem">
        <li data-read><b>Taking turns.</b> Each challenge belongs to one team. Other teams may give advice, but that team makes the final decision. In the last chapter, all teams answer together.</li>
        <li data-read><b>Challenges.</b> Moral choices, choose-the-path decisions, Bible puzzles and put-it-in-order puzzles.</li>
        <li data-read><b>Lamp oil 🪔.</b> Your shared lamp starts every chapter full. Faithful choices add oil. Wrong choices show you where they lead, and cost oil.</li>
        <li data-read><b>Restoration 🙏.</b> After a wrong choice, a restoration challenge lets you win oil back — because God always offers a way back. Restorations take turns between a question and 🎭 <b>charades</b>: one actor peeks at a secret card while everyone else looks away, then acts it out with no talking. Guess it before the timer runs out, and tap “They guessed it!” (honour system!).</li>
        <li data-read><b>Family mode</b> can never be failed, and puzzles can be tried again. <b>Teens & Adults mode</b> gives one try per question; if the lamp goes out, you replay that chapter. Earlier chapters are never lost.</li>
        <li data-read><b>💬 Spark.</b> After moral choices, pause and talk about the Spark question. This is where the real learning happens!</li>
        <li data-read><b>Saving.</b> Progress saves on this device. At the end of each chapter you also get a <b>save code</b> — write it down or take a photo to continue on any device.</li>
        <li><b>Keyboard:</b> press 1, 2, 3… to pick an answer, and Enter for the highlighted button. Press 🔊 to have the screen read aloud.</li>
      </ul>
      <div class="row end"><button class="btn primary" data-act="title">Back</button></div>
    </div></main>`, 'title');
  }

  function renderSetup() {
    const s = ui.setup;
    const fixed = !!s.fromCode;
    const nameInputs = Array.from({ length: s.teamCount }, (_, i) =>
      `<input type="text" maxlength="24" data-team="${i}" value="${esc(s.names[i] || DEFAULT_TEAMS[i])}" aria-label="Team ${i + 1} name">`).join('');
    show(`<main class="wrap"><div class="card stack">
      <h2>✨ ${fixed ? 'Continue from your save code' : 'Start a new journey'}</h2>
      ${fixed ? `<p>Your code puts you at <b>Chapter ${s.fromCode.chapterIndex + 1}</b> in <b>${MODE_NAMES[s.fromCode.mode]}</b> mode.</p>` : ''}
      <h3>1. Choose your mode</h3>
      <div class="modes">
        <button class="mode-card family ${s.mode === 'family' ? 'selected' : ''}" data-act="setMode" data-mode="family" ${fixed && s.mode !== 'family' ? 'disabled' : ''}>
          <h3>🌈 Family</h3><p>Everyone from age 5 to grandparents. Simple words, pictures, read-aloud and gentle rules — a chapter can never be failed.</p></button>
        <button class="mode-card teen ${s.mode === 'teen' ? 'selected' : ''}" data-act="setMode" data-mode="teen" ${fixed && s.mode !== 'teen' ? 'disabled' : ''}>
          <h3>🔥 Teens & Adults</h3><p>Real-life dilemmas, deeper prophecy and harder stakes: one try per question, and a dry lamp means replaying the chapter.</p></button>
      </div>
      <h3>2. How many teams?</h3>
      <div class="seg">${[1, 2, 3, 4].map(n => `<button class="${s.teamCount === n ? 'on' : ''}" data-act="setTeams" data-n="${n}">${n}</button>`).join('')}</div>
      <div class="teams">${nameInputs}</div>
      <label class="check"><input type="checkbox" data-pref="autoRead" ${prefs.autoRead ? 'checked' : ''}> Read each screen aloud automatically in Family mode (a grown-up can also be the narrator)</label>
      <label class="check"><input type="checkbox" data-pref="charades" ${prefs.charades ? 'checked' : ''}> Include 🎭 charades in restoration (someone acts out a Bible story or a ‘making it right’ scene)</label>
      <div class="row end">
        <button class="btn" data-act="title">Back</button>
        <button class="btn primary" data-act="startGame">Begin the journey →</button>
      </div>
    </div></main>`, 'title');
  }
  function captureSetupNames() {
    app.querySelectorAll('[data-team]').forEach(inp => { ui.setup.names[+inp.dataset.team] = inp.value; });
  }

  function renderCodeScreen(error) {
    show(`<main class="wrap center"><div class="card stack">
      <h2>🔑 Enter your save code</h2>
      <p>Type the code you got at the end of your last chapter, for example <b>DANIEL-7K3P</b>.</p>
      <div><input class="code-input" id="codeInput" data-focus autocomplete="off" spellcheck="false" placeholder="WORD-XXXX"></div>
      ${error ? `<p class="hint">${esc(error)}</p>` : ''}
      <div class="row center">
        <button class="btn" data-act="title">Back</button>
        <button class="btn primary" data-act="useCode">Continue →</button>
      </div>
    </div></main>`, 'title');
    const inp = document.getElementById('codeInput');
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') actions.useCode(); });
  }

  function renderMap() {
    const chs = content.chapters, n = chs.length, ci = state.chapterIndex;
    if (ci >= n) return renderVictory();
    const ch = chs[ci];
    const items = ch[state.mode];
    let ic = state.inChapter;
    if (ic && (ic.chapterId !== ch.id || ic.count !== items.length)) { state.inChapter = ic = null; persist(); } // content changed
    const W = 1000, H = 300;
    const pts = chs.map((c, i) => ({ x: 70 + i * ((W - 140) / Math.max(1, n - 1)), y: 145 + Math.sin(i * 1.25) * 70 }));
    const nodes = chs.map((c, i) => {
      const p = pts[i];
      const cls = i < ci ? 'done' : i === ci ? 'current' : 'locked';
      const ly = i % 2 ? p.y + 62 : p.y - 46;
      return `<g class="node ${cls}">
        ${cls === 'current' ? `<circle class="ring" cx="${p.x}" cy="${p.y}" r="36"/>` : ''}
        <circle cx="${p.x}" cy="${p.y}" r="34"/>
        <text x="${p.x}" y="${p.y + 12}" text-anchor="middle" font-size="32">${esc(c.symbol)}</text>
        ${cls === 'done' ? `<text class="tick" x="${p.x + 26}" y="${p.y - 22}">✓</text>` : ''}
        <text class="lbl" x="${p.x}" y="${ly}" text-anchor="middle">${esc(c.short)}</text></g>`;
    }).join('');
    const nextTeam = state.teams.length > 1 ? state.turn % state.teams.length : -1;
    show(`${topbar(!!ic)}<main class="wrap">
      <div class="card map"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Journey map: chapter ${ci + 1} of ${n}">
        <path class="trail" d="M ${pts.map(p => p.x + ' ' + p.y).join(' L ')}"/>${nodes}</svg></div>
      <div class="card stack">
        <div class="ch-num">Chapter ${ci + 1} of ${n} · ${esc(ch.book)}</div>
        <h2 data-read>${esc(ch.symbol)} ${esc(ch.title)}</h2>
        ${ic ? `<p>You’re part-way through: challenge ${ic.step + 1} of ${ic.order.length}.</p>` : `<p class="muted">${items.length} challenges · ${MODE_NAMES[state.mode]}</p>`}
        <div class="chips">${state.teams.map((t, i) => `<span class="chip ${i === nextTeam ? 'next' : ''}">${esc(t)}${i === nextTeam ? ' — next turn' : ''}</span>`).join('')}</div>
        ${ci > 0 ? `<p class="small muted">Stones of remembrance: <span class="stones" style="display:inline-flex;font-size:1.3rem">${stonesRow(ci)}</span></p>` : ''}
        <div class="row end">
          <button class="btn" data-act="stop">🌙 Stop for tonight</button>
          <button class="btn primary" data-act="playChapter">${ic ? '▶ Continue chapter' : '▶ Begin chapter ' + (ci + 1)}</button>
        </div>
      </div></main>`, state.mode);
  }

  function startChapter() {
    const ch = chapter();
    const items = ch[state.mode];
    const idx = items.map((_, i) => i);
    const finals = idx.filter(i => items[i].final);
    state.inChapter = {
      chapterId: ch.id, count: items.length,
      order: idx.filter(i => !items[i].final).concat(finals),
      step: 0, oil: MAX_OIL, faithfulHere: 0, usedRestore: []
    };
    persist();
  }

  function renderIntro() {
    const ch = chapter();
    show(`${topbar(true)}<main class="wrap"><div class="card intro">
      <div class="ch-num">Chapter ${state.chapterIndex + 1} of ${content.chapters.length} · ${esc(ch.book)}</div>
      <span class="big-symbol" aria-hidden="true">${esc(ch.symbol)}</span>
      <h2 data-read>${esc(ch.title)}</h2>
      <p class="lead" data-read>${esc(ch.intro[state.mode] || ch.intro.family || '')}</p>
      ${verseBlock(ch.keyVerse)}
      <div class="row end"><button class="btn primary" data-act="toChallenge">Begin →</button></div>
    </div></main>`, state.mode);
    autoRead();
  }

  function renderChallenge() {
    const { ic, item } = current();
    if (!item) return finishChapter();
    const t = typeOf(item);
    ui = { wrong: new Set(), picked: [] };
    const who = item.allTeams
      ? `<div class="turn all" data-read>🤝 All teams together!</div>`
      : state.teams.length > 1
        ? `<div class="turn"><span data-read>It’s <b>${esc(teamName())}</b>’s decision.</span><small class="muted">Other teams may advise — ${esc(teamName())} decides.</small></div>`
        : `<div class="turn"><span><b>${esc(teamName())}</b> — decide together.</span></div>`;

    let body = '';
    if (t === 'choice' || t === 'path') {
      ui.opts = shuffle(item.choices.map((_, i) => i));
      body = `<p class="situation" data-read>${esc(item.situation)}</p>` + (t === 'path'
        ? `<div class="paths">${ui.opts.map((idx, n) =>
            `<button class="path opt" data-act="pick" data-i="${idx}" data-sign="Path ${n + 1}"><span data-read>${esc(item.choices[idx].text)}</span></button>`).join('')}</div>`
        : optButtons(ui.opts, i => item.choices[i].text, 'pick'));
    } else if (t === 'quiz') {
      ui.opts = shuffle(item.options.map((_, i) => i));
      body = `<p class="question" data-read>${esc(item.question)}</p>` + optButtons(ui.opts, i => item.options[i].text, 'pick') + `<p class="hint" id="hint"></p>`;
    } else {
      let order = shuffle(item.items.map((_, i) => i));
      if (order.every((v, k) => v === k)) order = order.slice(1).concat(order[0]);
      ui.opts = order;
      body = `<p class="question" data-read>${esc(item.question)}</p>
        <div class="slots" id="slots"></div>
        <div class="pool">${order.map((idx, n) =>
          `<button class="opt" data-act="orderPick" data-i="${idx}"><span class="num">${n + 1}</span><span>${esc(item.items[idx])}</span></button>`).join('')}</div>
        <p class="hint" id="hint"></p>
        <div class="row end"><button class="btn" data-act="orderUndo">↩ Undo</button><button class="btn primary" id="orderCheck" data-act="orderCheck" disabled>Check ✓</button></div>`;
    }

    show(`${topbar(true)}<main class="wrap"><div class="card">
      <span class="step">${ic.step + 1} / ${ic.order.length}</span>
      <div class="kind">${KIND_LABELS[t]}</div>
      ${who}${body}
    </div></main>`, state.mode);
    if (t === 'order') updateOrder();
    autoRead();
  }

  function updateOrder(message) {
    const { item } = current();
    document.getElementById('slots').innerHTML = item.items.map((_, k) =>
      `<div class="slot ${ui.picked[k] != null ? 'filled' : ''}">${ui.picked[k] != null ? esc(item.items[ui.picked[k]]) : ''}</div>`).join('');
    app.querySelectorAll('.pool .opt').forEach(b => b.classList.toggle('used', ui.picked.indexOf(+b.dataset.i) >= 0));
    document.getElementById('orderCheck').disabled = ui.picked.length < item.items.length;
    document.getElementById('hint').textContent = message || '';
    if (ui.picked.length === item.items.length) document.getElementById('orderCheck').focus();
  }

  function changeOil(delta) {
    const ic = state.inChapter;
    const before = ic.oil;
    ic.oil = Math.max(rules().floor, Math.min(MAX_OIL, ic.oil + delta));
    return ic.oil - before;
  }

  function resolveMoral(choice) {
    const ic = state.inChapter;
    let delta;
    ic.answered = true;
    if (choice.faithful) { delta = changeOil(rules().faithfulGain); ic.faithfulHere++; Sound.good(); }
    else { delta = changeOil(-rules().moralLoss); Sound.bad(); }
    persist();
    renderResult({ good: choice.faithful, moral: true, chosen: choice.text, text: choice.result, delta, restore: !choice.faithful });
  }
  function resolvePuzzle(ok, answerText) {
    const { item } = current();
    let delta = 0;
    state.inChapter.answered = true;
    if (ok) Sound.good(); else { delta = changeOil(-rules().quizLoss); Sound.bad(); }
    persist();
    renderResult({ good: ok, moral: false, answer: ok ? '' : answerText, text: item.explain, delta, restore: state.inChapter.oil <= 0 });
  }

  function oilNote(delta) {
    if (!delta) return '';
    return `<div class="oil-note ${delta > 0 ? 'plus' : 'minus'}">🪔 ${delta > 0 ? '+' : ''}${delta} lamp oil</div>`;
  }

  function renderResult(r) {
    const { item } = current();
    const verdict = r.good ? (r.moral ? '✨ Faithful choice!' : '✅ Well done!') : (r.moral ? '⚠️ A costly choice' : '❌ Not quite');
    const graceNote = !r.good && state.mode === 'family' && state.inChapter.oil <= rules().floor
      ? `<p class="small muted" data-read>Your lamp is low, but God’s grace is enough — keep going!</p>` : '';
    show(`${topbar(true)}<main class="wrap"><div class="card result ${r.good ? 'good' : 'bad'}">
      <h2 class="verdict" data-read>${verdict}</h2>
      ${r.chosen ? `<p class="chosen">You chose: “${esc(r.chosen)}”</p>` : ''}
      ${r.answer ? `<p class="answer" data-read>The answer: <b>${esc(r.answer)}</b></p>` : ''}
      ${hasText(r.text) ? `<p class="body-text" data-read>${esc(r.text)}</p>` : ''}
      ${oilNote(r.delta)}${graceNote}
      ${verseBlock(item.verse)}
      ${r.moral ? sparkBlock(item.spark) : ''}
      <div class="row end">
        ${r.restore && restorationAvailable()
          ? '<button class="btn primary" data-act="restore">🙏 Restoration challenge →</button>'
          : '<button class="btn primary" data-act="next">Next →</button>'}
      </div>
    </div></main>`, state.mode);
    autoRead();
  }

  function charadePool() { return prefs.charades ? content.charades[state.mode] : []; }
  function restorationAvailable() { return content.restoration.length > 0 || charadePool().length > 0; }

  // Picks an unused index from a pool, starting over once every item has been used.
  function pickFresh(size, used) {
    let fresh = [];
    for (let i = 0; i < size; i++) if (used.indexOf(i) < 0) fresh.push(i);
    if (!fresh.length) { used.length = 0; for (let i = 0; i < size; i++) fresh.push(i); }
    const pick = fresh[Math.floor(Math.random() * fresh.length)];
    used.push(pick);
    return pick;
  }

  function renderRestoration() {
    const ic = state.inChapter;
    ic.restoreCount = (ic.restoreCount || 0) + 1;
    // Alternate: charades first, then a question, then charades… (whichever pools exist)
    const useCharade = charadePool().length > 0 && (!content.restoration.length || ic.restoreCount % 2 === 1);
    if (useCharade) return renderCharadeIntro();
    const pick = pickFresh(content.restoration.length, ic.usedRestore);
    persist();
    const r = content.restoration[pick];
    ui = { restore: pick, wrong: new Set(), opts: shuffle(r.options.map((_, i) => i)) };
    show(`${topbar(true)}<main class="wrap"><div class="card">
      <div class="kind">🙏 Restoration</div>
      <p class="muted" data-read>${state.mode === 'family'
        ? 'God always gives us a way back! Answer this to fill your lamp again.'
        : 'Repentance is a path back, not a dead end. One answer — get it right to restore lamp oil.'}</p>
      <p class="question" data-read>${esc(r.question)}</p>
      ${optButtons(ui.opts, i => r.options[i].text, 'restorePick')}
      <p class="hint" id="hint"></p>
    </div></main>`, state.mode);
    autoRead();
  }

  // ---------- Charades restoration ----------
  // One shared screen: everyone else looks away while the actor peeks, then the card is hidden.
  function renderCharadeIntro() {
    const ic = state.inChapter;
    if (!ic.usedCharades) ic.usedCharades = [];
    const pick = pickFresh(charadePool().length, ic.usedCharades);
    persist();
    ui = { charade: pick };
    const { item } = current();
    const who = item && item.allTeams || state.teams.length === 1 ? 'Choose one actor' : esc(teamName()) + ', choose one actor';
    show(`${topbar(true)}<main class="wrap"><div class="card center stack">
      <div class="kind">🎭 Charades Restoration</div>
      <span class="big-symbol" aria-hidden="true">🎭</span>
      <h2 data-read>Act out a story of restoration!</h2>
      <p class="lead" data-read>${who}. Everyone else: close your eyes or turn around!</p>
      <p class="muted" data-read>The actor acts it out with no talking and no sounds. Everyone else guesses. Guess it in time to refill your lamp.</p>
      ${state.mode === 'family' ? '<p class="small muted" data-read>Little actor? A grown-up can peek too and whisper it to them.</p>' : ''}
      <div class="row center"><button class="btn primary" data-act="charadePeek">🙈 Everyone’s looking away — show the actor</button></div>
    </div></main>`, state.mode);
    autoRead();
  }

  function renderCharadeSecret() {
    const c = charadePool()[ui.charade];
    // Nothing here is marked data-read, so read-aloud can never give the answer away.
    show(`${topbar(true)}<main class="wrap"><div class="card center stack charade-secret">
      <div class="kind">🤫 For the actor’s eyes only</div>
      <span class="big-symbol" aria-hidden="true">${esc(c.emoji || '🎭')}</span>
      <h2>${esc(c.act)}</h2>
      ${hasText(c.tip) ? `<p class="muted">💡 ${esc(c.tip)}</p>` : ''}
      <p class="small muted">Guessers should say something like: <b>${esc(c.answer)}</b></p>
      <div class="row center"><button class="btn primary" data-act="charadeAct">Got it — hide this and start the timer ▶</button></div>
    </div></main>`, state.mode);
  }

  function renderCharadeAct() {
    let left = state.mode === 'family' ? 90 : 60;
    show(`${topbar(true)}<main class="wrap"><div class="card center stack">
      <div class="kind">🎭 Charades Restoration</div>
      <h2 data-read>Action! No talking!</h2>
      <p class="lead" data-read>Everyone else: open your eyes and shout out your guesses!</p>
      <div class="timer" id="timer" aria-live="off">${left}</div>
      <p class="hint" id="timerNote"></p>
      <div class="row center">
        <button class="btn" data-act="charadeStop">⏹ Time’s up / we give up</button>
        <button class="btn primary" data-act="charadeGuessed">✅ They guessed it!</button>
      </div>
    </div></main>`, state.mode);
    const el = document.getElementById('timer');
    timerId = setInterval(() => {
      left--;
      el.textContent = Math.max(0, left);
      el.classList.toggle('hurry', left <= 10);
      if (left <= 3 && left > 0) Sound.click();
      if (left <= 0) {
        clearInterval(timerId); timerId = null;
        Sound.bad();
        el.textContent = '⏰';
        document.getElementById('timerNote').textContent = 'Time! Did someone guess it before the buzzer?';
      }
    }, 1000);
    autoRead();
  }

  function renderCharadeRetry() {
    show(`${topbar(true)}<main class="wrap"><div class="card center stack">
      <span class="big-symbol" aria-hidden="true">🔁</span>
      <h2 data-read>Not yet — want another go?</h2>
      <p class="lead" data-read>God gives second chances, and so do we! The same actor can try again, or you can see the answer.</p>
      <div class="row center">
        <button class="btn" data-act="charadeReveal">Show the answer</button>
        <button class="btn primary" data-act="charadeAct">🎭 Act it again</button>
      </div>
    </div></main>`, state.mode);
    autoRead();
  }

  function renderCharadeDone(ok, delta) {
    const c = charadePool()[ui.charade];
    const lampOut = state.mode === 'teen' && state.inChapter.oil <= 0;
    show(`${topbar(true)}<main class="wrap"><div class="card result center ${ok ? 'good' : 'bad'}">
      <h2 class="verdict" data-read>${ok ? '🎭 Bravo — restored!' : 'Good try!'}</h2>
      <span class="big-symbol" aria-hidden="true">${esc(c.emoji || '🎭')}</span>
      <p class="answer" data-read>It was: <b>${esc(c.answer)}</b></p>
      <p class="body-text" data-read>${ok ? 'God forgives and restores. Your lamp burns brighter again.' : 'Keep going — God’s mercy is new every morning.'}</p>
      ${oilNote(delta)}
      ${verseBlock(c.verse)}
      ${sparkBlock(c.spark)}
      <div class="row center"><button class="btn primary" data-act="next">${lampOut ? 'Continue…' : 'Next →'}</button></div>
    </div></main>`, state.mode);
    autoRead();
  }

  function renderRestoreDone(ok, delta) {
    const r = content.restoration[ui.restore];
    const lampOut = state.mode === 'teen' && state.inChapter.oil <= 0;
    show(`${topbar(true)}<main class="wrap"><div class="card result ${ok ? 'good' : 'bad'}">
      <h2 class="verdict" data-read>${ok ? '🙏 Restored!' : 'Not this time'}</h2>
      <p class="body-text" data-read>${ok ? 'God forgives and restores. Your lamp burns brighter again.' : 'The right answer is below. Keep going — God’s mercy is new every morning.'}</p>
      ${!ok ? `<p class="answer">The answer: <b>${esc(r.options.find(o => o.correct).text)}</b></p>` : ''}
      ${oilNote(delta)}
      ${verseBlock(r.verse)}
      <div class="row end"><button class="btn primary" data-act="next">${lampOut ? 'Continue…' : 'Next →'}</button></div>
    </div></main>`, state.mode);
    autoRead();
  }

  function advance() {
    const { ic, item } = current();
    if (item && !item.allTeams) state.turn = (state.turn + 1) % state.teams.length;
    ic.step++;
    ic.answered = false;
    persist();
    if (ic.step >= ic.order.length) finishChapter();
    else renderChallenge();
  }

  function renderLampOut() {
    Sound.bad();
    show(`${topbar(true)}<main class="wrap"><div class="card center stack">
      <span class="big-symbol" aria-hidden="true">🕯️</span>
      <h2 data-read>Your lamp has gone out</h2>
      <p class="lead" data-read>Like the five foolish virgins, the pilgrims ran out of oil before the journey’s end. But this is not the end of your story: start this chapter again with a full lamp. Every earlier chapter is safe.</p>
      ${verseBlock({ ref: 'Matthew 25:8', text: 'And the foolish said unto the wise, Give us of your oil; for our lamps are gone out.' })}
      ${sparkBlock('Which choices in this chapter drained the lamp? What would you do differently next time?')}
      <div class="row center"><button class="btn" data-act="map">🗺️ Map</button><button class="btn primary" data-act="replay">🔁 Replay chapter</button></div>
    </div></main>`, state.mode);
  }

  function finishChapter() {
    const ch = chapter();
    const ic = state.inChapter;
    state.faithful += ic ? ic.faithfulHere : 0;
    state.chapterIndex++;
    state.inChapter = null;
    persist();
    Sound.trumpet();
    const last = state.chapterIndex >= content.chapters.length;
    const code = makeCode(state.mode, state.chapterIndex, state.faithful);
    show(`${topbar(false)}<main class="wrap"><div class="card center stack">
      <div class="ch-num">Chapter complete</div>
      <span class="big-symbol" aria-hidden="true">${esc(ch.symbol)}</span>
      <h2 data-read>${esc(ch.title)} — complete!</h2>
      <p class="lead" data-read>You earned a stone of remembrance${ic ? ' and made ' + ic.faithfulHere + ' faithful choice' + (ic.faithfulHere === 1 ? '' : 's') + ' in this chapter' : ''}.</p>
      <div class="stones">${stonesRow(state.chapterIndex)}</div>
      ${verseBlock({ ref: 'Joshua 4:7', text: 'And these stones shall be for a memorial unto the children of Israel for ever.' })}
      <p>Your save code${last ? '' : ' for next time'}:</p>
      <div><span class="code-box">${esc(code)}</span></div>
      <p class="small muted">Write it down or take a photo — it works on any device.</p>
      <div class="row center">
        ${last
          ? '<button class="btn primary" data-act="victory">🎺 To the city!</button>'
          : '<button class="btn" data-act="stop">🌙 Stop for tonight</button><button class="btn primary" data-act="map">Next chapter →</button>'}
      </div>
    </div></main>`, state.mode);
  }

  function renderStop() {
    const code = makeCode(state.mode, state.chapterIndex, state.faithful);
    const ic = state.inChapter;
    show(`<main class="wrap center"><div class="card stack">
      <span class="big-symbol" aria-hidden="true">🌙</span>
      <h2>Good night, pilgrims!</h2>
      <p>Your journey is saved on this device. To continue on another device, use this code:</p>
      <div><span class="code-box">${esc(code)}</span></div>
      ${ic ? '<p class="small muted">The code starts this chapter from the beginning. On this device, you’ll continue exactly where you stopped.</p>' : ''}
      ${verseBlock({ ref: 'Psalm 4:8', text: 'I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.' })}
      <div class="row center"><button class="btn primary" data-act="title">Done</button></div>
    </div></main>`, 'title');
  }

  function renderVictory() {
    Sound.trumpet();
    const bits = Array.from({ length: 36 }, () => {
      const e = ['✨', '⭐', '👑', '🌿', '🎺', '💛', '🕊️'][Math.floor(Math.random() * 7)];
      return `<span style="left:${Math.random() * 100}%;animation-duration:${4 + Math.random() * 5}s;animation-delay:${Math.random() * 3}s">${e}</span>`;
    }).join('');
    show(`<div class="confetti" aria-hidden="true">${bits}</div>
      <main class="wrap center"><div class="card victory stack">
        <span class="big-symbol" aria-hidden="true">👑</span>
        <h1 data-read>The Pilgrims Are Victorious!</h1>
        <p class="lead" data-read>${esc(state.teams.join(', '))} — you travelled together from Eden to the New Jerusalem. ${state.faithful} faithful choice${state.faithful === 1 ? '' : 's'} along the way, and grace for every stumble.</p>
        <div class="stones">${stonesRow(content.chapters.length)}</div>
        ${verseBlock({ ref: 'Revelation 15:2', text: 'And I saw as it were a sea of glass mingled with fire: and them that had gotten the victory over the beast, and over his image, and over his mark, and over the number of his name, stand on the sea of glass, having the harps of God.' })}
        ${verseBlock({ ref: 'Revelation 21:4', text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.' })}
        ${sparkBlock('What will you be most excited to see when Jesus comes?')}
        <div class="row center"><button class="btn" data-act="title">Title screen</button><button class="btn primary" data-act="newGame">Begin a new journey</button></div>
      </div></main>`, state.mode);
    autoRead();
  }

  function renderCheck() {
    const rows = content.chapters.map((c, i) => {
      const extras = window.PJ.extras.filter(d => d && d.chapter === c.id).length;
      return `<tr><td>${i + 1}. ${esc(c.symbol)} ${esc(c.title)}</td><td><code>${esc(c.id)}</code></td><td>${c.family.length}</td><td>${c.teen.length}</td><td>${extras}</td></tr>`;
    }).join('');
    show(`<main class="wrap"><div class="card stack">
      <h2>🛠 Content check</h2>
      <p>Use this after editing <code>content/my-dilemmas.js</code> (or any content file) to make sure everything was read correctly.</p>
      <table class="check"><thead><tr><th>Chapter</th><th>Name to use</th><th>Family</th><th>Teen</th><th>Your dilemmas</th></tr></thead><tbody>${rows}</tbody></table>
      <p>Restoration questions: <b>${content.restoration.length}</b> · Charades: <b>${content.charades.family.length}</b> Family, <b>${content.charades.teen.length}</b> Teen</p>
      ${content.problems.length
        ? `<h3>⚠️ Problems found</h3><ul class="problems">${content.problems.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`
        : '<p class="ok">✅ No problems found. Everything loaded correctly.</p>'}
      <div class="row end"><button class="btn primary" data-act="title">Back</button></div>
    </div></main>`, 'title');
  }

  // ---------- Offline copy: bundles every file into one HTML file ----------
  async function downloadOffline(btn) {
    const label = btn.textContent;
    btn.disabled = true; btn.textContent = '⏳ Preparing…';
    try {
      const base = location.href.split('#')[0].split('?')[0];
      const get = async url => { const r = await fetch(new URL(url, base).href, { cache: 'no-store' }); if (!r.ok) throw new Error(url + ' (' + r.status + ')'); return r.text(); };
      let html = await get(base);
      const links = Array.from(html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)).filter(m => !/^https?:/.test(m[1]));
      for (const m of links) { const css = await get(m[1]); html = html.replace(m[0], () => '<style>\n' + css + '\n</style>'); }
      const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g));
      for (const m of scripts) { const js = await get(m[1]); html = html.replace(m[0], () => '<script>\n' + js.replace(/<\/script/gi, '<\\/script') + '\n</script>'); }
      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pilgrims-journey-offline.html';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    } catch (e) {
      alert('Sorry — the offline copy could not be prepared (' + e.message + '). Check your internet connection and try again.');
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  }

  // ---------- Actions ----------
  const actions = {
    title: renderTitle,
    howTo: renderHowTo,
    check: renderCheck,
    codeScreen: () => renderCodeScreen(),
    continue: () => (state.chapterIndex >= content.chapters.length ? renderVictory() : renderMap()),
    newGame: () => {
      if (state && state.chapterIndex > 0 && state.chapterIndex < content.chapters.length &&
          !confirm('Start a new journey? Your current progress on this device will be replaced. (Write down your save code first if you want to keep it: ' + makeCode(state.mode, state.chapterIndex, state.faithful) + ')')) return;
      ui.setup = { mode: 'family', teamCount: 2, names: DEFAULT_TEAMS.slice(), fromCode: null };
      renderSetup();
    },
    useCode: () => {
      const val = (document.getElementById('codeInput') || {}).value;
      const code = readCode(val);
      if (!code) return renderCodeScreen('That code doesn’t look right. Check each letter and try again.');
      ui.setup = { mode: code.mode, teamCount: 2, names: DEFAULT_TEAMS.slice(), fromCode: code };
      renderSetup();
    },
    setMode: el => { captureSetupNames(); ui.setup.mode = el.dataset.mode; renderSetup(); },
    setTeams: el => { captureSetupNames(); ui.setup.teamCount = +el.dataset.n; renderSetup(); },
    startGame: () => {
      captureSetupNames();
      const s = ui.setup;
      const teams = Array.from({ length: s.teamCount }, (_, i) => (s.names[i] || '').trim() || DEFAULT_TEAMS[i]);
      state = {
        v: 1, mode: s.mode, teams, turn: 0, inChapter: null,
        chapterIndex: s.fromCode ? s.fromCode.chapterIndex : 0,
        faithful: s.fromCode ? s.fromCode.faithful : 0
      };
      persist();
      Sound.trumpet();
      if (state.chapterIndex >= content.chapters.length) renderVictory(); else renderMap();
    },
    map: () => (state ? renderMap() : renderTitle()),
    stop: renderStop,
    playChapter: () => {
      if (!state.inChapter) { startChapter(); return renderIntro(); }
      if (state.inChapter.answered) return actions.next(); // stopped on a result screen: don't answer twice
      renderChallenge();
    },
    toChallenge: renderChallenge,
    replay: () => { startChapter(); renderIntro(); },
    victory: renderVictory,
    pick: el => {
      const { item } = current();
      const i = +el.dataset.i;
      const t = typeOf(item);
      if (t === 'choice' || t === 'path') return resolveMoral(item.choices[i]);
      if (item.options[i].correct) return resolvePuzzle(true);
      if (rules().retry) {
        el.disabled = true; el.classList.add('wrong'); Sound.bad();
        document.getElementById('hint').textContent = item.hint || 'Not quite — try another answer!';
        return;
      }
      resolvePuzzle(false, item.options.find(o => o.correct).text);
    },
    orderPick: el => {
      const i = +el.dataset.i;
      if (ui.picked.indexOf(i) >= 0) return;
      ui.picked.push(i); Sound.click(); updateOrder();
    },
    orderUndo: () => { ui.picked.pop(); updateOrder(); },
    orderCheck: () => {
      const { item } = current();
      if (ui.picked.length < item.items.length) return;
      if (ui.picked.every((v, k) => v === k)) return resolvePuzzle(true);
      if (rules().retry) {
        let k = 0;
        while (k < ui.picked.length && ui.picked[k] === k) k++;
        ui.picked = ui.picked.slice(0, k);
        Sound.bad();
        return updateOrder(k ? 'Not quite! The first ' + (k === 1 ? 'one is' : k + ' are') + ' right — keep going.' : 'Not quite — try again from the top!');
      }
      resolvePuzzle(false, item.items.join(' → '));
    },
    restore: renderRestoration,
    charadePeek: renderCharadeSecret,
    charadeAct: renderCharadeAct,
    charadeGuessed: () => {
      const d = changeOil(rules().restoreGain); persist(); Sound.good();
      renderCharadeDone(true, d);
    },
    charadeStop: () => (rules().retry ? renderCharadeRetry() : renderCharadeDone(false, 0)),
    charadeReveal: () => renderCharadeDone(false, 0),
    restorePick: el => {
      const r = content.restoration[ui.restore];
      if (r.options[+el.dataset.i].correct) {
        const d = changeOil(rules().restoreGain); persist(); Sound.good();
        return renderRestoreDone(true, d);
      }
      if (rules().retry) {
        el.disabled = true; el.classList.add('wrong'); Sound.bad();
        document.getElementById('hint').textContent = 'Try again — God is patient with us!';
        return;
      }
      Sound.bad();
      renderRestoreDone(false, 0);
    },
    next: () => (state.mode === 'teen' && state.inChapter.oil <= 0 ? renderLampOut() : advance()),
    read: readScreen,
    mute: () => {
      prefs.muted = !prefs.muted; savePrefs();
      app.querySelectorAll('[data-act="mute"]').forEach(b => {
        b.textContent = b.classList.contains('icon') ? (prefs.muted ? '🔇' : '🔔') : (prefs.muted ? '🔇 Sound off' : '🔔 Sound on');
      });
    },
    full: () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    },
    download: el => downloadOffline(el)
  };

  app.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled || !app.contains(el)) return;
    const fn = actions[el.dataset.act];
    if (fn) fn(el);
  });
  app.addEventListener('change', e => {
    const el = e.target.closest('[data-pref]');
    if (el) { prefs[el.dataset.pref] = el.checked; savePrefs(); }
  });

  // Number keys pick answers — handy with a wireless keyboard across the room.
  document.addEventListener('keydown', e => {
    if (e.target.matches && e.target.matches('input, textarea')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) {
      const opts = Array.from(app.querySelectorAll('.opt:not([disabled]):not(.used)'));
      const all = Array.from(app.querySelectorAll('.opt'));
      const target = all[n - 1];
      if (target && opts.indexOf(target) >= 0) target.click();
    }
  });

  renderTitle();
})();
