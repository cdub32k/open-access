import mongoose from "mongoose";

let imageCommentSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    body: String,
    username: String,
    replyId: mongoose.Types.ObjectId,
    replyCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

imageCommentSchema.index({ username: 1 });
imageCommentSchema.index({ imageId: 1 });

export default mongoose.model("image_comment", imageCommentSchema);
