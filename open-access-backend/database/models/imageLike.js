import mongoose from "mongoose";

let imageLikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

imageLikeSchema.index({ username: 1 });
imageLikeSchema.index({ imageId: 1 });

export default mongoose.model("image_like", imageLikeSchema);
