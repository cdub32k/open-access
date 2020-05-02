import mongoose from "mongoose";

let viewSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("video_view", viewSchema);
