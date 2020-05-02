import mongoose from "mongoose";

let noteDislikeSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("note_dislike", noteDislikeSchema);
