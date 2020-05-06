import mongoose from "mongoose";

let notificationSchema = new mongoose.Schema(
  {
    sender: String,
    receiver: String,
    type: String,
    target: String,
    body: String,
    id: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("notification", notificationSchema);
