/*
 * Charades cards — acted out during restoration after a wrong choice.
 * One actor peeks at the card while everyone else looks away, then acts it out with no talking.
 *
 *   emoji:  big picture shown to the actor
 *   act:    what the actor acts out (only the actor sees this)
 *   tip:    optional acting idea for the actor
 *   answer: what the guessers should say (shown to everyone afterwards)
 *   mode:   "family", "teen" or "both"
 */

// ---- Bible stories of restoration (both modes) ----
PJ.addCharade({
  mode: "both", emoji: "🐑",
  act: "A shepherd loses one sheep, searches everywhere, finds it — and carries it home on his shoulders, rejoicing!",
  tip: "Shade your eyes and search under rocks, then lift the sheep onto your shoulders and do a happy dance.",
  answer: "The lost sheep (Luke 15)",
  verse: { ref: "Luke 15:5", text: "And when he hath found it, he layeth it on his shoulders, rejoicing." },
  spark: "Jesus said heaven throws a party when one person comes back. How does it feel to be found?"
});

PJ.addCharade({
  mode: "both", emoji: "🏠",
  act: "A son who ran away comes home sad and hungry — and his father runs to hug him and throws a party.",
  tip: "Walk slowly with your head down, then look up surprised… and get a big hug (hug one of the guessers!).",
  answer: "The prodigal son (Luke 15)",
  verse: { ref: "Luke 15:20", text: "But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him." }
});

PJ.addCharade({
  mode: "both", emoji: "🌳",
  act: "A short man climbs a tree to see Jesus, then climbs down and gives back all the money he took.",
  tip: "Stand on tiptoe, pretend to climb, peek through leaves, then hand out pretend coins to everyone.",
  answer: "Zacchaeus",
  verse: { ref: "Luke 19:8", text: "And Zacchaeus stood, and said unto the Lord; Behold, Lord, the half of my goods I give to the poor; and if I have taken any thing from any man by false accusation, I restore him fourfold." }
});

PJ.addCharade({
  mode: "both", emoji: "🐋",
  act: "Jonah runs away from God, gets swallowed by a giant fish, prays inside it, and gets spat out onto the beach.",
  tip: "Run, then get ‘gulped’, curl up small and pray, then tumble out onto the floor.",
  answer: "Jonah and the big fish",
  verse: { ref: "Jonah 2:1", text: "Then Jonah prayed unto the LORD his God out of the fish’s belly," }
});

PJ.addCharade({
  mode: "both", emoji: "🐓",
  act: "Peter hears a rooster crow and cries because he said he didn’t know Jesus. Later, Jesus forgives him.",
  tip: "Flap your arms like a rooster, cup your ear, then cry… and finish with a happy hug.",
  answer: "Peter and the rooster — Peter forgiven",
  verse: { ref: "Luke 22:62", text: "And Peter went out, and wept bitterly." },
  spark: "Peter failed badly — and Jesus still gave him an important job. What does that tell us about God?"
});

PJ.addCharade({
  mode: "both", emoji: "🤗",
  act: "A man cries and hugs the brothers who sold him as a slave long ago — he forgives them!",
  tip: "Pretend to be a ruler on a throne, then come down, cry and hug ‘your brothers’.",
  answer: "Joseph forgiving his brothers",
  verse: { ref: "Genesis 45:15", text: "Moreover he kissed all his brethren, and wept upon them:" }
});

PJ.addCharade({
  mode: "both", emoji: "🌊",
  act: "A proud army captain dips himself in a river seven times — and his sick skin becomes clean!",
  tip: "March proudly, then dunk down and up, counting 1 to 7 on your fingers, then look amazed at your arms.",
  answer: "Naaman washing in the Jordan",
  verse: { ref: "2 Kings 5:14", text: "Then went he down, and dipped himself seven times in Jordan, according to the saying of the man of God: and his flesh came again like unto the flesh of a little child, and he was clean." }
});

PJ.addCharade({
  mode: "both", emoji: "🦶",
  act: "Jesus kneels down with a bowl of water and washes His friends’ dirty feet.",
  tip: "Tie on a pretend towel, kneel, pour water and scrub feet gently.",
  answer: "Jesus washing the disciples’ feet",
  verse: { ref: "John 13:5", text: "After that he poureth water into a bason, and began to wash the disciples’ feet, and to wipe them with the towel wherewith he was girded." }
});

// ---- Making it right today (family) ----
PJ.addCharade({
  mode: "family", emoji: "🧸",
  act: "You took your sister’s toy. Now you give it back, say sorry (with actions, no words!), and she forgives you.",
  tip: "Hide a pretend toy behind your back, look sad, hand it over, then share a hug.",
  answer: "Saying sorry and giving it back",
  verse: { ref: "Ephesians 4:32", text: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ’s sake hath forgiven you." }
});

PJ.addCharade({
  mode: "family", emoji: "🏺",
  act: "You broke something by accident. You go and tell Mom or Dad, and then you help clean it up.",
  tip: "Act out the crash, look worried, tap a grown-up on the shoulder, point, then sweep up together.",
  answer: "Telling the truth and making it right",
  verse: { ref: "Proverbs 28:13", text: "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy." }
});

// ---- Making it right today (teens & adults) ----
PJ.addCharade({
  mode: "teen", emoji: "💵",
  act: "A cashier gives you too much change. You walk out of the shop, stop, turn around, and go back to return it.",
  tip: "Count the money twice, do a double-take, then walk back and hand it over with a smile.",
  answer: "Returning extra change — honesty",
  verse: { ref: "Luke 16:10", text: "He that is faithful in that which is least is faithful also in much: and he that is unjust in the least is unjust also in much." }
});

PJ.addCharade({
  mode: "teen", emoji: "🤝",
  act: "Two friends had a huge argument. One stops on the way to church, goes back, apologises, and they make peace.",
  tip: "Act out the argument, storm off, freeze halfway, turn back, then offer a handshake that becomes a hug.",
  answer: "Making peace before worship (Matthew 5:24)",
  verse: { ref: "Matthew 5:24", text: "Leave there thy gift before the altar, and go thy way; first be reconciled to thy brother, and then come and offer thy gift." }
});

PJ.addCharade({
  mode: "teen", emoji: "📱",
  act: "Someone deletes an app they’ve been hiding, puts the phone face-down, and kneels to pray.",
  tip: "Look around guiltily, hold the phone close, then press ‘delete’ firmly and kneel.",
  answer: "Turning away from temptation — repentance",
  verse: { ref: "Psalm 51:10", text: "Create in me a clean heart, O God; and renew a right spirit within me." }
});

PJ.addCharade({
  mode: "teen", emoji: "⛏️",
  act: "Achan digs up the treasure he hid under his tent and confesses what he stole.",
  tip: "Look around nervously, dig, lift out heavy pretend gold, then hang your head and point at yourself.",
  answer: "Achan confessing his hidden sin",
  verse: { ref: "Joshua 7:20", text: "And Achan answered Joshua, and said, Indeed I have sinned against the LORD God of Israel," }
});
