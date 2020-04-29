import mongoose from "mongoose";

let videoSchema = new mongoose.Schema({
  url: String,
  username: String,
  uploadedAt: { type: Date, default: +new Date() },
});

export default mongoose.model("video", videoSchema);
