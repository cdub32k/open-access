import dotenv from "dotenv";
dotenv.config();

const { Note, NoteLike, NoteDislike, NoteComment } = require("../database");

const router = require("express").Router();

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

let deleteReplies = async (comm, img) => {
  let replies = await NoteComment.find({ replyId: comm._id });
  if (replies) {
    await img.update({ $inc: { commentCount: -replies.length } });
    replies.forEach(async (reply) => {
      await deleteReplies(reply, img);
      await reply.delete();
    });
  }
};

router.delete("/comments/:id", async (req, res) => {
  try {
    const iComment = await NoteComment.findOne({ _id: req.params.id });
    if (iComment) {
      await Note.updateOne(
        { _id: iComment.noteId },
        { $inc: { commentCount: -1 } }
      );
      if (iComment.replyId) {
        const rComment = await NoteComment.findOne({ _id: iComment.replyId });
        rComment.replyCount--;
        await rComment.save();
      }

      let note = await Note.findOne({ _id: iComment.noteId });
      await deleteReplies(iComment, note);

      await iComment.delete();
    }
    let note = await Note.findOne({ _id: iComment.noteId });
    return res
      .status(200)
      .send({ createdAt: note.createdAt, commentCount: note.commentCount });
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" + e });
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
