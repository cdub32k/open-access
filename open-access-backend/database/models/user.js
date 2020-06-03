import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      default: "http://localhost:5000/img/default-profile.png",
    },
    username: {
      type: String,
      unique: true,
    },
    email: String,
    displayName: String,
    phoneNumber: String,
    city: String,
    state: String,
    country: String,
    bio: String,
    passwordHash: String,
    stripeCustomerId: String,
    stripePaymentMethodId: String,
    active: Boolean,
    activeUntil: Date,
  },
  { timestamps: { createdAt: "joinedAt" } }
);

export default mongoose.model("user", userSchema);
