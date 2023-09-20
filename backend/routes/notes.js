const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route-1: Get all the Notes using: GET "/api/notes/fetchallnotes", Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route-2: Add a new Note using: POST "/api/notes/addnote", Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must contain atleast 3 characters!").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must contain atleast 5 characters!"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route-3: Update an existing note using: PUT "/api/notes/updatenote", Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    //Create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated & update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Unauthorised Error!")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote} , {new:true})
    res.json(note);
});

module.exports = router;
