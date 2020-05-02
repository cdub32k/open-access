import mongoose from "mongoose";

let noteDislikeSchema = new mongoose.Schema({
  noteId: mongoose.Types.ObjectId,
  username: String,
  createdAt: { type: Date, default: +new Date() },
});

export default mongoose.model("note_dislike", noteDislikeSchema);
