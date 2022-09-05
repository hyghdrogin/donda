import { Schema, model } from "mongoose";
import { IUser } from "../utils/interface";

const userSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, unique: true },
    photo: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    balance: { type: Number, default: 0 },
    accountNo: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

userSchema.index({
  firstName: "text",
  lastName: "text",
});

export default model<IUser>("User", userSchema);
