import mongoose from "mongoose";

let imageSchema = new mongoose.Schema({
  url: String,
  title: String,
  caption: String,
  username: String,
  uploadeddAt: { type: Date, default: +new Date() },
});

export default mongoose.model("image", imageSchema);
