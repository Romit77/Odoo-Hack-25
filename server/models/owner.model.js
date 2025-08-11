import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
    role: { type: String, enum: ["admin", "owner"], default: "owner" },
  },
  { timestamps: true }
);

export default mongoose.model("Owner", ownerSchema);
