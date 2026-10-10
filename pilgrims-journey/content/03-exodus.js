PJ.addChapter({
  id: "exodus",
  key: "EXODUS",
  symbol: "⛰️",
  short: "Exodus",
  title: "Out of Egypt",
  book: "Exodus 12–32",
  intro: {
    family: "God’s people were slaves in Egypt. God sent Moses and set them free! At Mount Sinai, God gave them the Ten Commandments. But while Moses was up on the mountain, the people made a golden calf and worshipped it.",
    teen: "Getting Israel out of Egypt took one night; getting Egypt out of Israel took forty years. At Sinai God wrote His law with His own finger — including the fourth commandment, which points to Him as Creator. Weeks later the people danced around a golden calf. Idols rarely look like idols to the people worshipping them."
  },
  keyVerse: { ref: "Exodus 20:3", text: "Thou shalt have no other gods before me." },

  family: [
    {
      type: "path",
      situation: "You are leaving Egypt! One way follows the pillar of cloud — God leading you. Another way is a shortcut that some people say is faster.",
      choices: [
        { text: "☁️ Follow the pillar of cloud", faithful: true, result: "God led His people every step — cloud by day, fire by night. Following God is always the right way, even when it looks longer." },
        { text: "🏃 Take the shortcut", faithful: false, result: "Shortcuts away from God lead to getting lost. God’s people were safe when they followed where He led." }
      ],
      verse: { ref: "Exodus 13:21", text: "And the LORD went before them by day in a pillar of a cloud, to lead them the way; and by night in a pillar of fire, to give them light;" },
      spark: "How does God lead us today, now that we don’t have a pillar of cloud?"
    },
    {
      type: "choice",
      situation: "At your friend’s house you see a tiny toy car you love. Your friend has so many — they won’t even notice if you put it in your pocket.",
      choices: [
        { text: "Leave it there, and maybe ask to borrow it", faithful: true, result: "God said, ‘Thou shalt not steal.’ Asking is always better than taking!" },
        { text: "Put it in your pocket", faithful: false, result: "Even if nobody notices, God sees, and your heart feels heavy. You can make it right by giving it back and saying sorry." }
      ],
      verse: { ref: "Exodus 20:15", text: "Thou shalt not steal." },
      spark: "What could you do if you already took something that wasn’t yours?"
    },
    {
      type: "order",
      question: "Put the Exodus story in order!",
      items: [
        "God sends Moses to Pharaoh",
        "God’s people cross the Red Sea",
        "God gives the Ten Commandments",
        "The people make a golden calf"
      ],
      explain: "God rescued His people first, and then gave them His law to show them how to live as free people.",
      verse: { ref: "Exodus 14:13", text: "And Moses said unto the people, Fear ye not, stand still, and see the salvation of the LORD, which he will shew to you to day:" }
    },
    {
      type: "quiz",
      question: "What did the people make while Moses was on the mountain?",
      options: [
        { text: "A golden calf", correct: true },
        { text: "A golden boat" },
        { text: "A silver house" }
      ],
      explain: "They melted their earrings to make a calf and bowed down to it. That made God very sad, because He had just set them free!",
      verse: { ref: "Exodus 20:4", text: "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth:" }
    },
    {
      type: "quiz",
      question: "Which day did God say to remember and keep holy?",
      options: [
        { text: "The seventh day — the Sabbath", correct: true },
        { text: "Every day is just the same" },
        { text: "Only birthdays" }
      ],
      explain: "God made the world in six days and rested on the seventh. The Sabbath is our special weekly time with Him!",
      verse: { ref: "Exodus 20:8", text: "Remember the sabbath day, to keep it holy." }
    }
  ],

  teen: [
    {
      type: "choice",
      situation: "You do freelance work in the same field as your job. One of your employer’s biggest clients says: ‘Do it for me privately — half the price, cash. Your boss never needs to know. And honestly, they underpay you anyway.’",
      choices: [
        { text: "Decline, and say you’d be glad to help through the company", faithful: true, result: "Integrity costs you money today. But you kept faith with an employer who trusted you with their customers — and ‘he that is faithful in that which is least is faithful also in much’ (Luke 16:10)." },
        { text: "Take it — they really do underpay you, so it evens out", faithful: false, result: "The justification felt fair. But taking your employer’s customer is taking what belongs to them. Being underpaid is a real problem to raise honestly — not a licence to quietly steal." },
        { text: "Take just this one job, then stop", faithful: false, result: "‘Just once’ was Achan’s thought too. A secret like this has to be protected with more secrets — one compromise usually needs another to stay hidden." }
      ],
      verse: { ref: "Ephesians 4:28", text: "Let him that stole steal no more: but rather let him labour, working with his hands the thing which is good, that he may have to give to him that needeth." },
      spark: "What makes ‘they underpay me anyway’ feel so convincing? What honest options do you have when you really are treated unfairly?"
    },
    {
      type: "choice",
      situation: "Your manager offers you the promotion you’ve worked toward — but it requires covering Friday-night and Saturday shifts. ‘Everyone else makes sacrifices,’ they say.",
      choices: [
        { text: "Thank them, explain your Sabbath conviction respectfully, and offer Sundays or other hours", faithful: true, result: "Daniel, Joseph and Nehemiah all served well in workplaces that didn’t share their faith. Honesty, respect and a real offer to help often earn more respect than you expect — and when they don’t, God is still faithful." },
        { text: "Take it for now — you can go back to keeping Sabbath once you’re established", faithful: false, result: "‘Once I’m established’ rarely arrives. The fourth commandment begins with ‘Remember’ because it is so easy to let it slide, one ‘necessary’ week at a time." }
      ],
      verse: { ref: "Exodus 20:11", text: "For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it." },
      spark: "What’s the difference between a sacrifice for your job and a compromise of your faith? Where is the line?"
    },
    {
      type: "choice",
      situation: "Your screen-time report says six hours a day. Your morning worship has shrunk to two minutes. A friend says, ‘Idols are statues. A phone can’t be an idol.’",
      choices: [
        { text: "Set a limit, and give your first time of the day to God before the screen", faithful: true, result: "‘No other gods before me’ — before my face. What we look at first and longest shapes what we worship. You just put God back in front." },
        { text: "Agree — it’s just a tool, not an idol", faithful: false, result: "The golden calf was ‘just’ jewellery until people bowed to it. An idol is anything that takes God’s place in your attention, trust or time." }
      ],
      verse: { ref: "Exodus 20:3", text: "Thou shalt have no other gods before me." },
      spark: "If someone watched your week, what would they say you worship?"
    },
    {
      type: "quiz",
      question: "The fourth commandment gives a reason for keeping the Sabbath. What is it?",
      options: [
        { text: "The LORD made heaven and earth in six days and rested the seventh", correct: true },
        { text: "It was a custom Israel brought from Egypt" },
        { text: "Moses chose the day himself" }
      ],
      explain: "Exodus 20:11 makes the Sabbath a memorial of creation. Revelation 14:7 calls the world to ‘worship him that made heaven, and earth’ — remember that, because it returns at the end of the journey.",
      verse: { ref: "Exodus 20:11", text: "For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it." }
    },
    {
      type: "quiz",
      question: "When Aaron presented the golden calf, what did he call the celebration? (Exodus 32:5)",
      options: [
        { text: "‘A feast to the LORD’", correct: true },
        { text: "‘A feast to Baal’" },
        { text: "‘A feast to Pharaoh’" }
      ],
      explain: "That is the most unsettling detail: they used God’s own name for false worship. Mixing truth with error deceives more people than open rebellion — a theme that returns with ‘Babylon’ in Revelation.",
      verse: { ref: "Exodus 32:5", text: "And when Aaron saw it, he built an altar before it; and Aaron made proclamation, and said, To morrow is a feast to the LORD." }
    }
  ]
});
