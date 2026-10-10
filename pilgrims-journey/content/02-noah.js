PJ.addChapter({
  id: "flood",
  key: "NOAH",
  symbol: "🌈",
  short: "Noah",
  title: "Noah and the Ark",
  book: "Genesis 6–9",
  intro: {
    family: "People had forgotten God and were very unkind to each other. But Noah loved God. God told Noah to build a giant boat — an ark — because a flood was coming. People laughed at Noah, but he kept on building.",
    teen: "120 years of preaching, and only eight people boarded. Noah’s story is about faithfulness while the crowd mocks — and Jesus said the last days would look the same: ‘as the days of Noe were’ (Matthew 24:37)."
  },
  keyVerse: { ref: "Genesis 6:22", text: "Thus did Noah; according to all that God commanded him, so did he." },

  family: [
    {
      type: "choice",
      situation: "At lunch, you bow your head to pray. Some kids giggle and say, ‘Why are you doing that?’",
      choices: [
        { text: "Keep praying, then smile and say you were thanking God", faithful: true, result: "Noah kept building even when people laughed. Being brave and kind at the same time makes Jesus smile." },
        { text: "Stop praying so they won’t laugh", faithful: false, result: "It’s hard when people laugh. But Noah didn’t stop building the ark! Next time you can pray quietly — God still hears every word." }
      ],
      verse: { ref: "Genesis 6:8", text: "But Noah found grace in the eyes of the LORD." },
      spark: "Have you ever been laughed at for doing the right thing? How did it feel?"
    },
    {
      type: "quiz",
      question: "How did the animals get to the ark?",
      options: [
        { text: "God brought them to Noah", correct: true },
        { text: "Noah caught them with a big net" },
        { text: "They swam there" }
      ],
      explain: "God sent the animals to Noah — two of every kind, and seven of the clean animals!",
      verse: { ref: "Genesis 6:20", text: "Of fowls after their kind, and of cattle after their kind, of every creeping thing of the earth after his kind, two of every sort shall come unto thee, to keep them alive." }
    },
    {
      type: "path",
      situation: "It starts to rain! One path goes into the ark with Noah. The other goes up a tall hill, where the other people say they will be safe.",
      choices: [
        { text: "🚢 Into the ark", faithful: true, result: "The ark was God’s way to be safe. When God gives us a way, it is always the best way." },
        { text: "⛰️ Up the tall hill", faithful: false, result: "The hill looked safe, but it wasn’t God’s plan. Only the ark kept people safe from the flood." }
      ],
      verse: { ref: "Genesis 7:1", text: "And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation." },
      spark: "How can we know what God’s safe way is?"
    },
    {
      type: "quiz",
      question: "What sign did God put in the sky to promise He would never flood the whole earth again?",
      options: [
        { text: "A rainbow", correct: true },
        { text: "A shooting star" },
        { text: "A big moon" }
      ],
      explain: "Every rainbow reminds us that God keeps His promises!",
      verse: { ref: "Genesis 9:13", text: "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth." }
    }
  ],

  teen: [
    {
      type: "choice",
      situation: "The group chat is roasting a classmate who posted about their faith. It’s honestly funny. Someone tags you: ‘Your turn 😂’.",
      choices: [
        { text: "Don’t join in — message the classmate privately with encouragement", faithful: true, result: "Noah was ‘a preacher of righteousness’ in a mocking world. Refusing to pile on, and quietly encouraging the target, is the same courage in a smaller ark." },
        { text: "Send a mild joke — nothing too mean", faithful: false, result: "A ‘mild’ joke still adds a brick to the wall. The crowd in Noah’s day didn’t think they were doing anything terrible either — they were just going along." },
        { text: "Leave it on read and say nothing", faithful: false, result: "Silence kept your hands clean, but it didn’t help anyone. Noah didn’t just avoid the evil — he warned and he built." }
      ],
      verse: { ref: "2 Peter 2:5", text: "And spared not the old world, but saved Noah the eighth person, a preacher of righteousness, bringing in the flood upon the world of the ungodly;" },
      spark: "Is staying silent ever the faithful choice? When does silence become going along?"
    },
    {
      type: "choice",
      situation: "Your family committed to a one-year Bible reading plan. It’s month four, and everyone has ‘more important things’ now. Nobody would blame you for quitting.",
      choices: [
        { text: "Keep going — even one chapter a day — and invite someone to join you", faithful: true, result: "Noah built for 120 years with no rain in sight. Faithfulness is mostly ordinary days of simply showing up." },
        { text: "Pause until life calms down", faithful: false, result: "‘Later’ is the most effective delay there is. In Noah’s day people also assumed there would be more time — until the door was shut." }
      ],
      verse: { ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not." },
      spark: "What helps you keep a good habit going when the excitement wears off?"
    },
    {
      type: "quiz",
      question: "Jesus said the last days would be ‘as the days of Noe.’ According to Matthew 24:38–39, what were people doing before the flood?",
      options: [
        { text: "Eating, drinking and marrying — ordinary life, unaware until the flood came", correct: true },
        { text: "Fighting wars constantly" },
        { text: "Building a tower to reach heaven" }
      ],
      explain: "The danger wasn’t only wickedness — it was distraction. Life went on as normal, and they ‘knew not until the flood came.’",
      verse: { ref: "Matthew 24:37", text: "But as the days of Noe were, so shall also the coming of the Son of man be." }
    },
    {
      type: "quiz",
      question: "Who shut the door of the ark?",
      options: [
        { text: "The LORD", correct: true },
        { text: "Noah" },
        { text: "Noah’s son Shem" }
      ],
      explain: "Genesis 7:16 says ‘the LORD shut him in.’ Adventists see a parallel with the close of probation before Christ returns (Revelation 22:11) — a door that God, not man, will close.",
      verse: { ref: "Genesis 7:16", text: "And they that went in, went in male and female of all flesh, as God had commanded him: and the LORD shut him in." }
    }
  ]
});
