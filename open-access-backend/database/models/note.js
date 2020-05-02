import mongoose from "mongoose";

let noteSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "uploadedAt" } }
);

export default mongoose.model("note", noteSchema);
