# How to add your own dilemmas

All your own content goes in one file: **`content/my-dilemmas.js`**. You never need to touch the game code.

## The quick way (on GitHub, no software needed)

1. On GitHub, open `pilgrims-journey/content/my-dilemmas.js`.
2. Click the ✏️ pencil icon ("Edit this file").
3. Copy the template at the bottom of the file, paste it at the end, and fill it in.
4. Click **Commit changes**.
5. Within a minute or two the website version updates by itself. Open the game, click **🛠 Check content (for leaders)** on the title screen, and make sure there are no problems listed.

## What a dilemma looks like

```js
PJ.addDilemma({
  chapter: "exodus",          // which chapter it joins (list below)
  mode: "teen",               // "family", "teen", or "both"
  situation: "Describe what's happening. Make the wrong choice genuinely tempting.",
  choices: [
    { text: "The faithful choice", faithful: true,
      result: "What happens next, and why it honours God." },
    { text: "The tempting choice, with its best excuse", faithful: false,
      result: "The consequence: show where this choice leads." }
  ],
  verse: { ref: "Exodus 20:15", text: "Thou shalt not steal." },
  spark: "A question for the family to talk about together."
});
```

You can have 2, 3 or 4 choices. At least one must be `faithful: true`. The game shuffles the order, so the right answer won't always be first.

### Chapter names

| Use this | Chapter |
|---|---|
| `"eden"` | The Garden and the Great Controversy |
| `"flood"` | Noah and the Ark |
| `"exodus"` | Out of Egypt |
| `"jericho"` | Into the Promised Land |
| `"babylon"` | Daniel in Babylon |
| `"prophecy"` | Daniel's Visions |
| `"jesus"` | Jesus the Messiah |
| `"angels"` | The Three Angels and the Final Choice |
| `"victory"` | The Pilgrims Victorious |

### Other challenge types

Use `PJ.addChallenge` for puzzles:

```js
// Bible puzzle (multiple choice): exactly one option has correct: true
PJ.addChallenge({
  chapter: "babylon", mode: "both", type: "quiz",
  question: "How many friends were thrown into the fiery furnace?",
  options: [ { text: "Three", correct: true }, { text: "Two" }, { text: "Seven" } ],
  explain: "Shadrach, Meshach and Abednego, and a fourth Man joined them!",
  verse: { ref: "Daniel 3:25", text: "Lo, I see four men loose, walking in the midst of the fire…" }
});

// Put it in order: list the items in the CORRECT order, and the game shuffles them
PJ.addChallenge({
  chapter: "jesus", mode: "family", type: "order",
  question: "Put Jesus' life in order!",
  items: [ "Born in Bethlehem", "Baptised in the Jordan", "Died on the cross", "Rose again" ],
  verse: { ref: "1 Corinthians 15:4", text: "And that he was buried, and that he rose again the third day according to the scriptures:" }
});

// Choose the path: same as a dilemma, but shown as two signposts
PJ.addChallenge({ chapter: "flood", mode: "family", type: "path", situation: "…", choices: [ … ], verse: { … } });
```

### Charades cards (restoration)

After a wrong choice, restoration takes turns between a question and **🎭 charades**: one actor secretly reads a card while everyone else looks away, then acts it out with no talking. The ready-made cards are in `content/charades.js`. Add your own to `my-dilemmas.js` like this:

```js
PJ.addCharade({
  mode: "family",             // "family", "teen" or "both"
  emoji: "🍞",
  act: "A boy gives his five loaves and two fish to Jesus, who feeds thousands of people.",
  tip: "Hold out a small basket, then act amazed as you hand out food to everyone.",
  answer: "Feeding the five thousand",
  verse: { ref: "John 6:9", text: "There is a lad here, which hath five barley loaves, and two small fishes:" }
});
```

Good charades cards are about **being restored**: saying sorry, giving back, forgiving, coming home. Keep the `act` to one or two sentences that a 7-year-old could perform. Families can switch charades off in the setup screen.

## Writing dilemmas that actually teach

- **Make the wrong answer tempting.** If the right answer is obvious, it's a quiz, not a dilemma. Give the wrong choice its *best* excuse ("they underpay me anyway", "just this once", "God looks at the heart").
- **Show the consequence, don't just say "wrong."** The `result` text is where the learning happens.
- **Try a three-way choice:** one faithful answer, one obvious compromise, and one that *sounds* reasonable (staying silent, compromising privately, "pausing for now").
- **Family mode:** use short sentences, everyday situations (sharing, telling the truth, obeying parents, kindness) and no scary detail.
- **Copy KJV verses exactly**, and check them against your Bible.

## Common mistakes

| Problem | Fix |
|---|---|
| A whole file stops working | Usually a missing comma between items, or a missing `}` or `)`. "Check content" shows which file. |
| Text cuts off strangely | Don't use plain `"` inside text that's wrapped in `"…"`. Use curly quotes ‘ ’ or “ ” instead (apostrophes like *don't* are fine). |
| "names chapter … which does not exist" | Check the spelling against the chapter table above (all lowercase). |
| "needs exactly one option with correct: true" | A quiz needs exactly one right answer. |

## Getting updates to families

- **Website link:** updates appear automatically after you commit (GitHub Pages usually takes a minute or two).
- **Offline copy:** families tap **⬇️ Download offline copy** on the title screen to get a fresh single file. Old copies keep working but won't have your new dilemmas.

## Adding a whole new chapter

Copy one of the chapter files (for example `content/05-babylon.js`), give it a new `id`, `key` and `title`, then add a `<script src="content/your-file.js"></script>` line to `index.html` in the place it should appear in the journey. Save codes record the chapter number, so if you add a chapter in the middle, codes from before the change will point one chapter off.
