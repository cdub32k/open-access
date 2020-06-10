import mongoose from "mongoose";

let viewSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

viewSchema.index({ username: 1 });
viewSchema.index({ videoId: 1 });

export default mongoose.model("video_view", viewSchema);
