import mongoose from "mongoose";

let videoDislikeSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

videoDislikeSchema.index({ username: 1 });
videoDislikeSchema.index({ videoId: 1 });

export default mongoose.model("video_dislike", videoDislikeSchema);
