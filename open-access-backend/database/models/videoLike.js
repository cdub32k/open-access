import mongoose from "mongoose";

let videoLikeSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("video_like", videoLikeSchema);
