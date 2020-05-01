import mongoose from "mongoose";

let imageSchema = new mongoose.Schema({
  url: String,
  title: String,
  caption: String,
  username: String,
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: +new Date() },
});

export default mongoose.model("image", imageSchema);
