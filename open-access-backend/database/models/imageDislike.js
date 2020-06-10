import mongoose from "mongoose";

let imageDislikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

imageDislikeSchema.index({ username: 1 });
imageDislikeSchema.index({ imageId: 1 });

export default mongoose.model("image_dislike", imageDislikeSchema);
