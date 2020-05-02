import mongoose from "mongoose";

let imageLikeSchema = new mongoose.Schema({
  imageId: mongoose.Types.ObjectId,
  username: String,
  createdAt: { type: Date, default: +new Date() },
});

export default mongoose.model("image_like", imageLikeSchema);
