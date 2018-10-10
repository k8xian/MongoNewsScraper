const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//saving a schema for the note
var noteSchema = new Schema({
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  date: {
    type: Date,
    default: Date.now
  },
  noteText: String
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
