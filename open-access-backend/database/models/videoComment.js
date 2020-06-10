import mongoose from "mongoose";

let videoCommentSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    body: String,
    username: String,
    replyId: mongoose.Types.ObjectId,
    replyCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

videoCommentSchema.index({ username: 1 });
videoCommentSchema.index({ videoId: 1 });

export default mongoose.model("video_comment", videoCommentSchema);
