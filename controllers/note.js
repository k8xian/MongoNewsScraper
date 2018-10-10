const db = require("../models");

//ORM for the notes
module.exports = {
  //find the notes for the headline that matches the ID
  find: function(req, res) {
    db.Note.find({ _headlineId: req.params.id }).then(function(dbNote) {
      res.json(dbNote);
    });
  },
  //create a note that will get attached to the headline later
  create: function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
      res.json(dbNote);
    });
  },
  //delete a note based on the url route
  delete: function(req, res) {
    db.Note.remove({ _id: req.params.id }).then(function(dbNote) {
      res.json(dbNote);
    });
  }
};
