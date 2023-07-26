const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter the note name"],
    },
    description: {
      type: String,
      required: [true, "please provide a brief description of your notes"],
    },
  },
  {
    timestamps: true,
  }
);
const noteModel = mongoose.model("note", noteSchema);
module.exports = noteModel;
