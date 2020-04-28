import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: String,
  passwordHash: String,
  stripeCustomerId: String,
  stripePaymentMethodId: String,
});

export default mongoose.model("user", userSchema);
