import mongoose from "mongoose";

let videoCommentDislikeSchema = new mongoose.Schema(
  {
    videoId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "video_comment_dislike",
  videoCommentDislikeSchema
);