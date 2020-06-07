import mongoose from "mongoose";

let videoCommentSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    body: String,
    username: String,
    replyId: mongoose.Types.ObjectId,
    replyCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("video_comment", videoCommentSchema);
