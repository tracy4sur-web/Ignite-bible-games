/*
 * The Pilgrim's Journey — content registry.
 * Loaded before every content file. Content files call PJ.addChapter(),
 * PJ.addRestoration() and PJ.addDilemma(); game.js reads what they add.
 */
window.PJ = (function () {
  var chapters = [];
  var extras = [];
  var restoration = [];
  var loadErrors = [];

  // A typing mistake in a content file stops that file loading; remember it so
  // "Check content" can point to it instead of the chapter silently vanishing.
  window.addEventListener('error', function (e) {
    var file = (e.filename || '').split('/').pop() || 'a content file';
    loadErrors.push(file + (e.lineno ? ' (line ' + e.lineno + ')' : '') + ': ' + (e.message || 'could not be read'));
  });

  return {
    chapters: chapters,
    extras: extras,
    restoration: restoration,
    loadErrors: loadErrors,

    // A whole chapter (stage) of the journey. Chapters play in the order they are added.
    addChapter: function (chapter) { chapters.push(chapter); },

    // One restoration question (used after a wrong choice to win back lamp oil).
    addRestoration: function (item) { restoration.push(item); },

    // Your own moral dilemma, added to the end of an existing chapter.
    addDilemma: function (dilemma) {
      var d = {};
      for (var k in dilemma) d[k] = dilemma[k];
      if (!d.type) d.type = 'choice';
      extras.push(d);
    },

    // Any challenge type (choice, path, quiz, order) added to an existing chapter.
    addChallenge: function (challenge) { extras.push(challenge); }
  };
})();
