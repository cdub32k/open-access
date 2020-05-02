import mongoose from "mongoose";

let noteLikeSchema = new mongoose.Schema(
  {
    noteId: mongoose.Types.ObjectId,
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("note_like", noteLikeSchema);
