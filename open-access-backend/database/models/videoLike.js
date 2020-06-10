import mongoose from "mongoose";

let videoLikeSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

videoLikeSchema.index({ username: 1 });
videoLikeSchema.index({ videoId: 1 });

export default mongoose.model("video_like", videoLikeSchema);
