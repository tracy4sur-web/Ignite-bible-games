/*
 * ============================================================
 *  YOUR OWN DILEMMAS
 * ============================================================
 *  Add your own moral dilemmas here. Each one is added to the
 *  end of the chapter you name. Full instructions are in
 *  HOW-TO-ADD-DILEMMAS.md (in the same folder as index.html).
 *
 *  Chapter names you can use:
 *    "eden"      The Garden and the Great Controversy
 *    "flood"     Noah and the Ark
 *    "exodus"    Out of Egypt
 *    "jericho"   Into the Promised Land
 *    "babylon"   Daniel in Babylon
 *    "prophecy"  Daniel's Visions
 *    "jesus"     Jesus the Messiah
 *    "angels"    The Three Angels and the Final Choice
 *    "victory"   The Pilgrims Victorious
 *
 *  Mode:  "family"  (ages 5+),  "teen"  (teens & adults),  or  "both"
 *
 *  After saving, open the game and click
 *  "🛠 Check content (for leaders)" on the title screen to make
 *  sure your dilemma was read correctly.
 * ============================================================
 */

// ---- Example (this one is switched on — edit or delete it) ----
PJ.addDilemma({
  chapter: "babylon",
  mode: "family",
  situation: "Your friends are watching a scary show that your parents said is not for you. They say, ‘Just watch a little bit — your parents aren’t here!’",
  choices: [
    { text: "Say no thanks, and find something else to do", faithful: true,
      result: "Daniel decided in his heart to stay faithful, even when nobody from home was watching. You did too!" },
    { text: "Watch it anyway", faithful: false,
      result: "Scary shows can give us bad dreams, and our parents say no because they love us. It’s okay to change your mind and walk away." }
  ],
  verse: { ref: "Philippians 4:8", text: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things." },
  spark: "What can you say to friends when they want you to do something your family has said no to?"
});

// ---- Your own charades card (acted out during restoration) ----
// Copy this, remove the /* and */, and fill it in. Only the actor sees "act" and "tip".
/*
PJ.addCharade({
  mode: "both",               // "family", "teen" or "both"
  emoji: "🎭",
  act: "What the actor acts out — no talking!",
  tip: "An idea for how to act it.",
  answer: "What the guessers should say",
  verse: { ref: "Book 1:1", text: "The KJV verse, copied exactly." }
});
*/

// ---- Copy this template to add your own dilemma (remove the /* and */ around it) ----
/*
PJ.addDilemma({
  chapter: "exodus",
  mode: "teen",
  situation: "Describe the situation here. Make the wrong choice genuinely tempting!",
  choices: [
    { text: "The faithful choice", faithful: true,
      result: "What happens, and why it honours God." },
    { text: "The tempting choice, with its best excuse", faithful: false,
      result: "The consequence — show where this choice leads." }
  ],
  verse: { ref: "Book 1:1", text: "The KJV verse, copied exactly." },
  spark: "A question for the family to talk about together."
});
*/
