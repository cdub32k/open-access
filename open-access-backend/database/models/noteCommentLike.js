import mongoose from "mongoose";

let noteCommentLikeSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

noteCommentLikeSchema.index({ commentId: 1 });

export default mongoose.model("note_comment_like", noteCommentLikeSchema);
