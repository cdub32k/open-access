import mongoose from "mongoose";

let imageCommentSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    body: String,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("image_comment", imageCommentSchema);
