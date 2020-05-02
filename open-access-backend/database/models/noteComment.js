import mongoose from "mongoose";

let noteCommentSchema = new mongoose.Schema({
  noteId: mongoose.Types.ObjectId,
  body: String,
  username: String,
  createdAt: { type: Date, default: +new Date() },
});

export default mongoose.model("note_comment", noteCommentSchema);
