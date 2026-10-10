# The Pilgrim's Journey

A cooperative Bible team game for families, played on one shared screen. Pilgrims travel from Eden to the New Jerusalem through nine chapters: Eden, Noah, Exodus, the Promised Land, Daniel in Babylon, Daniel's Visions, Jesus, the Three Angels, and the Victory. Each chapter mixes moral dilemmas, choose-the-path decisions, Bible puzzles and put-it-in-order puzzles.

- **Two modes:** Family (ages 5 and up: simple words, read-aloud, can't be failed) and Teens & Adults (real-life dilemmas, deeper prophecy, one try per question).
- **Cooperative:** teams take turns deciding, other teams may advise, and everyone wins together.
- **Lamp oil and restoration:** wrong choices show their consequences and cost oil, and a restoration question wins it back. In Teens & Adults mode, a dry lamp means replaying the chapter.
- **Campaign:** one chapter per sitting. Progress saves on the device, and each chapter ends with a save code that works on any device.
- **Scripture:** KJV, following Seventh-day Adventist historicist prophetic interpretation.

## Playing

- **Online:** open `pilgrims-journey/index.html` from the GitHub Pages site.
- **Offline:** click **⬇️ Download offline copy** on the title screen to get one HTML file, or download this folder and double-click `index.html`. No internet is needed after that; fonts fall back to system fonts.
- Connect a laptop to the TV, press ⛶ for full screen, and use 1/2/3 on a keyboard to pick answers.

## Adding your own dilemmas

See **[HOW-TO-ADD-DILEMMAS.md](HOW-TO-ADD-DILEMMAS.md)**. Everything goes in `content/my-dilemmas.js`.

## Files

```
index.html               page + the list of content files, in journey order
css/style.css            the three looks (Ignite title, Family storybook, Teen cinematic)
js/registry.js           how content files register themselves
js/game.js               the game engine
content/01-…09-*.js      the nine chapters
content/restoration.js   restoration questions
content/my-dilemmas.js   YOUR dilemmas
```
