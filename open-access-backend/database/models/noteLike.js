import mongoose from "mongoose";

let noteLikeSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

noteLikeSchema.index({ username: 1 });
noteLikeSchema.index({ noteId: 1 });

export default mongoose.model("note_like", noteLikeSchema);
