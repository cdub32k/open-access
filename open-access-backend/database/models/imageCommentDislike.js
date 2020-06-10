import mongoose from "mongoose";

let imageCommentDislikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

imageCommentDislikeSchema.index({ commentId: 1 });

export default mongoose.model(
  "image_comment_dislike",
  imageCommentDislikeSchema
);
