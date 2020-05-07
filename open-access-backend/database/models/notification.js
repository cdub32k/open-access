import mongoose from "mongoose";

import pubsub from "../../PubSub";
import { NOTIFICATION_SUBSCRIPTION_PREFIX } from "../../constants";

let notificationSchema = new mongoose.Schema(
  {
    sender: String,
    receiver: String,
    type: String,
    target: String,
    targetId: mongoose.Types.ObjectId,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

notificationSchema.pre("save", function (done) {
  if (!this.isNew) return done();

  pubsub.publish(NOTIFICATION_SUBSCRIPTION_PREFIX + this.receiver, {
    notifications: {
      sender: this.sender,
      type: this.type,
      target: this.target,
      targetId: this.targetId,
      body: null,
    },
  });
  done();
});

export default mongoose.model("notification", notificationSchema);
