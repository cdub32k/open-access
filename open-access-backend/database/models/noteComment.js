import mongoose from "mongoose";

let noteCommentSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    body: String,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("note_comment", noteCommentSchema);
