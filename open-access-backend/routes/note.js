import dotenv from "dotenv";
dotenv.config();

const { Note, NoteLike, NoteDislike, NoteComment } = require("../database");

const router = require("express").Router();

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id });

    await NoteLike.deleteMany({ noteId: note._id });
    await NoteDislike.deleteMany({ noteId: note._id });
    await NoteComment.deleteMany({ noteId: note._id });
    await note.delete();

    return res.status(200).send(true);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

export default router;
