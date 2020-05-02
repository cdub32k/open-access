import mongoose from "mongoose";

let videoCommentSchema = new mongoose.Schema({
  videoId: mongoose.Types.ObjectId,
  body: String,
  username: String,
  createdAt: { type: Date, default: +new Date() },
});

export default mongoose.model("video_comment", videoCommentSchema);
