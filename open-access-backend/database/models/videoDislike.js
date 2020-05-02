import mongoose from "mongoose";

let videoDislikeSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("video_dislike", videoDislikeSchema);
