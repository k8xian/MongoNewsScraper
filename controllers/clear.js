const db = require("../models");

//clearing headlines and related notes when clear is clicked
module.exports = {
  dbClear: function(req, res) {
    db.Headline.remove({})
      .then(function() {
        return db.Note.remove({});
      })
      .then(function() {
        res.json({ ok: true });
      });
  }
};
