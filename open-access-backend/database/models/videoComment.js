import mongoose from "mongoose";

let videoCommentSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    body: String,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("video_comment", videoCommentSchema);
