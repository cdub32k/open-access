import mongoose from "mongoose";

let videoSchema = new mongoose.Schema(
  {
    url: String,
    thumbUrl: String,
    title: String,
    caption: String,
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    username: String,
  },
  { timestamps: { createdAt: "uploadedAt" } }
);

videoSchema.index({ username: 1 });

export default mongoose.model("video", videoSchema);
