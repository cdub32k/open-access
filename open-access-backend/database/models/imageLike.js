import mongoose from "mongoose";

let imageLikeSchema = new mongoose.Schema(
  {
    imageId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("image_like", imageLikeSchema);
