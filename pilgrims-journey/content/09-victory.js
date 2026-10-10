PJ.addChapter({
  id: "victory",
  key: "ZION",
  symbol: "👑",
  short: "Victory",
  title: "The Pilgrims Victorious",
  book: "Revelation 15, 19–22",
  intro: {
    family: "Jesus is coming back in the clouds! Every eye will see Him. God’s faithful people from every country will go home with Him to a beautiful city, where nobody is ever sad again.",
    teen: "The journey ends where Daniel 2 promised: the stone fills the whole earth. On the sea of glass stand those that ‘had gotten the victory over the beast’ — not because they were strong, but because they held on to the Lamb. This last stage, every team answers together."
  },
  keyVerse: { ref: "Revelation 21:4", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },

  family: [
    {
      type: "quiz",
      allTeams: true,
      question: "How will Jesus come back?",
      options: [
        { text: "In the clouds — and every eye will see Him", correct: true },
        { text: "Secretly, so nobody knows" },
        { text: "As a baby again" }
      ],
      explain: "When Jesus comes back, everyone in the whole world will see Him! It will be the happiest day ever.",
      verse: { ref: "Revelation 1:7", text: "Behold, he cometh with clouds; and every eye shall see him," }
    },
    {
      type: "order",
      allTeams: true,
      question: "Put the end of the story in order!",
      items: [
        "☁️ Jesus comes in the clouds",
        "🕊️ God’s people go to heaven with Jesus",
        "🏙️ The holy city comes down from heaven",
        "🌍 God makes the earth new",
        "💛 We live with God forever"
      ],
      explain: "That’s the happy ending God has planned for His family — forever!",
      verse: { ref: "Revelation 21:1", text: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away;" }
    },
    {
      type: "quiz",
      allTeams: true,
      question: "What will NOT be in the New Jerusalem?",
      options: [
        { text: "Tears, pain and sadness", correct: true },
        { text: "Trees and rivers" },
        { text: "Happy people" }
      ],
      explain: "In God’s city there is the river of life and the tree of life — but no more crying, and no more pain!",
      verse: { ref: "Revelation 21:4", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." }
    },
    {
      type: "choice",
      allTeams: true,
      final: true,
      situation: "The pilgrims have reached the gates of the holy city! Everyone, answer together: whose strength brought you all the way here?",
      choices: [
        { text: "Jesus! He helped us every step of the way", faithful: true, result: "Yes! We worked together as a team, but Jesus gave us the strength. Welcome home, pilgrims!" },
        { text: "We did it all by ourselves", faithful: false, result: "We worked hard as a team — but only Jesus can bring us home. He gave us strength every single step!" }
      ],
      verse: { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
      spark: "What was your favourite part of the whole journey?"
    }
  ],

  teen: [
    {
      type: "quiz",
      allTeams: true,
      question: "What happens to the righteous dead when Christ returns?",
      options: [
        { text: "They are raised from the grave — ‘the dead in Christ shall rise first’", correct: true },
        { text: "Nothing — they are already in heaven" },
        { text: "They are reincarnated" }
      ],
      explain: "Scripture describes death as a sleep (John 11:11; Ecclesiastes 9:5). The hope of the believer is resurrection at the Second Coming, not an immortal soul.",
      verse: { ref: "1 Thessalonians 4:16", text: "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first:" }
    },
    {
      type: "order",
      allTeams: true,
      question: "Put the final events in order, as Adventists understand them.",
      items: [
        "Close of probation",
        "The seven last plagues",
        "The Second Coming of Christ",
        "The 1,000 years — the redeemed in heaven",
        "The holy city descends; sin is destroyed",
        "The earth made new"
      ],
      explain: "Probation closes, the plagues fall, Christ returns, the redeemed reign with Him in heaven for a thousand years (Revelation 20:4), then the New Jerusalem descends, sin is destroyed for ever, and God makes all things new.",
      verse: { ref: "Revelation 21:5", text: "And he that sat upon the throne said, Behold, I make all things new." }
    },
    {
      type: "quiz",
      allTeams: true,
      question: "‘Blessed are they that do his ___, that they may have right to the tree of life.’ (Revelation 22:14)",
      options: [
        { text: "commandments", correct: true },
        { text: "festivals" },
        { text: "traditions" }
      ],
      explain: "The Bible’s last chapter returns to Eden’s tree of life — now open again to a people restored to loyalty.",
      verse: { ref: "Revelation 22:14", text: "Blessed are they that do his commandments, that they may have right to the tree of life, and may enter in through the gates into the city." }
    },
    {
      type: "choice",
      allTeams: true,
      final: true,
      situation: "On the sea of glass, the redeemed sing the song of Moses and the Lamb. Looking back over the whole journey — Eden to Zion — what carried the pilgrims through?",
      choices: [
        { text: "Christ’s righteousness, held by a faith that obeys", faithful: true, result: "‘They overcame him by the blood of the Lamb.’ Obedience was the fruit; Christ was the root. Welcome home, pilgrims." },
        { text: "Our own record of good choices", faithful: false, result: "Every team stumbled somewhere on this journey — that is why restoration existed. No one reaches the city on their own record: ‘according to his mercy he saved us’ (Titus 3:5)." }
      ],
      verse: { ref: "Revelation 12:11", text: "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death." },
      spark: "Which stage of the journey challenged you most — and what did it teach you?"
    }
  ]
});
