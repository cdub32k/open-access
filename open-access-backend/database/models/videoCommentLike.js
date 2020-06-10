import mongoose from "mongoose";

let videoCommentLikeSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

videoCommentLikeSchema.index({ commentId: 1 });

export default mongoose.model("video_comment_like", videoCommentLikeSchema);
