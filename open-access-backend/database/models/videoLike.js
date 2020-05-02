import mongoose from "mongoose";

let videoLikeSchema = new mongoose.Schema({
  videoId: mongoose.Types.ObjectId,
  username: String,
  createdAt: { type: Date, default: +new Date() },
});

export default mongoose.model("video_like", videoLikeSchema);
