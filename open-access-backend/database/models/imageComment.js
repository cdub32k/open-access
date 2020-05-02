import mongoose from "mongoose";

let imageCommentSchema = new mongoose.Schema({
  imageId: mongoose.Types.ObjectId,
  body: String,
  username: String,
  createdAt: { type: Date, default: +new Date() },
});

export default mongoose.model("image_comment", imageCommentSchema);
