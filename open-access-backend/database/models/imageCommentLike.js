import mongoose from "mongoose";

let imageCommentLikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

imageCommentLikeSchema.index({ commentId: 1 });

export default mongoose.model("image_comment_like", imageCommentLikeSchema);
