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

noteSchema.index({ username: 1 });

export default mongoose.model("note", noteSchema);
