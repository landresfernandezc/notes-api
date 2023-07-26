const express = require("express");
const noteModel = require("./models/note");
const app = express();
app.use(express.json());
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var cors = require('cors');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find({});
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.post("/getNotes", async (req, res) => {
  try {
    const notes = await noteModel.find({});
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.post("/getNoteById", async (req, res) => {
  try {
    const { id } = req.body;
    const notes = await noteModel.findById(id);
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.post("/notes", async (req, res) => {
  try {
    const noteObject = await noteModel.create(req.body);
    res.status(200).json(noteObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.put("/updateNotes", async (req, res) => {
  try {
    const { id } = req.body;
    const noteObject = await noteModel.findByIdAndUpdate(id, req.body);
    if (!noteObject) {
      return res
        .status(404)
        .json({ message: `cannot find any note with id ${id}` });
    }
    const updatedNote = await noteModel.findById(id);
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/deleteNotes", async (req, res) => {
  try {
    const { id } = req.body;
    let deletedNote = await noteModel.findByIdAndDelete(id);
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Cannot delete the specified Note" });
    }
    res.status(200).json(deletedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://Cluster03828:12345@cluster03828.pnaizcx.mongodb.net/notes?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
