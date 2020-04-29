import mongoose from "mongoose";

let videoSchema = new mongoose.Schema({
  url: String,
  thumbUrl: String,
  title: String,
  caption: String,
  views: { type: Number, defualt: 0 },
  username: String,
  uploadedAt: { type: Date, default: +new Date() },
});

export default mongoose.model("video", videoSchema);
