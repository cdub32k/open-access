import mongoose from "mongoose";

let noteCommentSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    body: String,
    username: String,
    replyId: mongoose.Types.ObjectId,
    replyCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("note_comment", noteCommentSchema);
