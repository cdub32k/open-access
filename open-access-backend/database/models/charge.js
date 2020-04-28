import mongoose from "mongoose";

let chargeSchema = new mongoose.Schema({
  stripePaymentIntentId: String,
  stripePaymentMethodId: String,
  username: String,
  amount: Number,
  refunded: { type: Boolean, default: false },
  refundedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("charge", chargeSchema);
