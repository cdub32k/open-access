import dotenv from "dotenv";
dotenv.config();

const { Note, NoteLike, NoteDislike, NoteComment } = require("../database");

const router = require("express").Router();
import { deleteReplies } from "../utils/helpers";

router.put("/comments/:id", async (req, res) => {
  try {
    await NoteComment.updateOne(
      { _id: req.params.id },
      { body: req.body.body }
    );

    return res.status(200).send(true);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const iComment = await NoteComment.findOne({ _id: req.params.id });
    let note = await Note.findOne({ _id: iComment.noteId });
    let totalDecr = 1;
    if (iComment) {
      if (iComment.replyId) {
        const rComment = await NoteComment.findOne({ _id: iComment.replyId });
        rComment.replyCount--;
        await rComment.save();
      }

      totalDecr += await deleteReplies(NoteComment, iComment, note);

      await iComment.delete();
    }
    await note.update({ $inc: { commentCount: -totalDecr } });
    return res.status(200).send({
      createdAt: note.createdAt,
      commentCount: note.commentCount - totalDecr,
    });
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

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
