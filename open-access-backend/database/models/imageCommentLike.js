import mongoose from "mongoose";

let imageCommentLikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("image_comment_like", imageCommentLikeSchema);
