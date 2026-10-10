PJ.addChapter({
  id: "eden",
  key: "EDEN",
  symbol: "🌳",
  short: "Eden",
  title: "The Garden and the Great Controversy",
  book: "Genesis 1–3",
  intro: {
    family: "God made a beautiful garden and gave it to Adam and Eve. He gave them one rule to show their love: do not eat from one special tree. But a sneaky serpent came with a tricky question…",
    teen: "Before Babylon, before the beasts, the Great Controversy began in a garden. Lucifer’s first weapon wasn’t force — it was a question: ‘Yea, hath God said?’ (Genesis 3:1). Every test on this journey is a version of that question."
  },
  keyVerse: { ref: "Genesis 3:15", text: "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel." },

  family: [
    {
      type: "choice",
      situation: "Mom said, ‘No cookies before dinner.’ Your brother whispers, ‘Mom won’t know. Just one!’",
      choices: [
        { text: "Wait until after dinner", faithful: true, result: "You chose to obey. Waiting is hard, but obeying shows love — just like God asked Adam and Eve to trust Him." },
        { text: "Eat one quickly", faithful: false, result: "The cookie tasted good for one minute, but then you felt worried and had to hide it. Eve learned that ‘nobody will know’ was not true." }
      ],
      verse: { ref: "Ephesians 6:1", text: "Children, obey your parents in the Lord: for this is right." },
      spark: "Why did the serpent want Eve to think God’s rule was unfair?"
    },
    {
      type: "quiz",
      question: "What did the serpent say to Eve?",
      options: [
        { text: "‘Ye shall not surely die’", correct: true },
        { text: "‘Please obey God’" },
        { text: "‘Go and ask Adam first’" }
      ],
      explain: "The serpent told a lie. God had said the fruit would bring death, and the serpent said it wouldn’t.",
      verse: { ref: "Genesis 3:4", text: "And the serpent said unto the woman, Ye shall not surely die:" }
    },
    {
      type: "path",
      situation: "Two paths in the garden! One goes to the tree God said not to touch. The other goes to walk with God in the cool of the day.",
      choices: [
        { text: "🌿 Walk with God", faithful: true, result: "Walking with God is the safest path of all. His Word is like a lamp that shows us where to go." },
        { text: "🍎 Go and look at the tree", faithful: false, result: "Eve went to look, and looking made her want it. When we stay away from temptation, it is much easier to say no." }
      ],
      verse: { ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
      spark: "What are some ‘trees’ we should stay away from, so we don’t get tempted?"
    },
    {
      type: "quiz",
      question: "Right after Adam and Eve sinned, God made a wonderful promise. What was it?",
      options: [
        { text: "A Saviour would come and crush the serpent’s head", correct: true },
        { text: "They could never be forgiven" },
        { text: "The serpent would win" }
      ],
      explain: "Even on the saddest day, God promised Jesus! He would come and defeat the serpent (Satan).",
      verse: { ref: "Genesis 3:15", text: "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel." }
    }
  ],

  teen: [
    {
      type: "choice",
      situation: "A popular podcaster you like says: ‘Ancient rules were written for ancient people. Trust your own heart — you decide what’s right for you.’ Your friends share it with 🔥 emojis.",
      choices: [
        { text: "Weigh it against Scripture before deciding what you think", faithful: true, result: "You noticed the old pattern: Eden’s serpent also told Eve she could decide good and evil for herself (Genesis 3:5). Testing ideas by the Word is not narrow-minded — it is how you avoid being deceived." },
        { text: "Share it — it sounds freeing and everyone agrees", faithful: false, result: "‘Ye shall be as gods’ was the first lie, and it still sounds like freedom. Making yourself the final authority felt good — but you have stepped onto the serpent’s path." },
        { text: "Keep it to yourself, but quietly start living by it", faithful: false, result: "Private compromise is still compromise. Eve didn’t announce her choice either — she looked, desired, and took (Genesis 3:6)." }
      ],
      verse: { ref: "Isaiah 8:20", text: "To the law and to the testimony: if they speak not according to this word, it is because there is no light in them." },
      spark: "Why do lies that sound like ‘freedom’ work so well? Where have you heard ‘ye shall be as gods’ in modern words?"
    },
    {
      type: "quiz",
      question: "In the Great Controversy, what was Lucifer’s central accusation against God?",
      options: [
        { text: "That God’s law was unfair and could not be kept", correct: true },
        { text: "That God had no real power" },
        { text: "That angels should rule the earth instead of humans" }
      ],
      explain: "Ellen White traces the whole conflict to Lucifer’s claim that God’s law was arbitrary and impossible to keep. The life and death of Jesus, and the faithfulness of His people, answer that charge before the universe.",
      verse: { ref: "Revelation 12:7", text: "And there was war in heaven: Michael and his angels fought against the dragon; and the dragon fought and his angels," }
    },
    {
      type: "choice",
      situation: "It’s midnight. You’re scrolling, and a link leads toward content you have committed to avoid. Nobody else is awake.",
      choices: [
        { text: "Close the app and put the phone in another room", faithful: true, result: "You broke Eve’s sequence — saw, desired, took — at ‘saw’, the easiest place to stop. God promises ‘a way to escape’; sometimes it is as simple as a closed door and a phone out of reach." },
        { text: "Just look — looking isn’t doing", faithful: false, result: "Eve also only looked at first. Looking fed desiring, and desiring led to taking. Temptation rarely asks for everything at once." },
        { text: "Scroll past it, but stay on the app", faithful: false, result: "You didn’t click — yet. But staying in the danger zone at midnight is like Eve lingering beside the tree. The faithful move was leaving." }
      ],
      verse: { ref: "1 Corinthians 10:13", text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it." },
      spark: "What is your personal ‘way to escape’ when you are tempted? Make a plan together now, before the moment comes."
    },
    {
      type: "quiz",
      question: "Genesis 3:15 promises that the ‘seed of the woman’ will bruise the serpent’s head. Who is that seed?",
      options: [
        { text: "Jesus Christ", correct: true },
        { text: "Cain, Eve’s firstborn" },
        { text: "Noah" }
      ],
      explain: "This is the first gospel promise in the Bible. The serpent would ‘bruise his heel’ at the cross, but Christ would deal the fatal blow to Satan’s head.",
      verse: { ref: "Galatians 4:4", text: "But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law," }
    }
  ]
});
