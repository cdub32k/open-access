import mongoose from "mongoose";

let noteDislikeSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

noteDislikeSchema.index({ username: 1 });
noteDislikeSchema.index({ noteId: 1 });

export default mongoose.model("note_dislike", noteDislikeSchema);
