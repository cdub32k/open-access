import mongoose from "mongoose";

let imageDislikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("image_dislike", imageDislikeSchema);
