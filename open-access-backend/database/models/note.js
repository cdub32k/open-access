import mongoose from "mongoose";

let noteSchema = new mongoose.Schema({
  body: String,
  username: String,
  uploadeddAt: { type: Date, default: +new Date() },
});

export default mongoose.model("note", noteSchema);
