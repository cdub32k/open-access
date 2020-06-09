import mongoose from "mongoose";

let noteCommentDislikeSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("note_comment_dislike", noteCommentDislikeSchema);