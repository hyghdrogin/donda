import { Schema, model } from "mongoose";
import { ICredit } from "../utils/interface";

const creditSchema = new Schema({
  amount : { type: Number },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
      type: String,
      default: "pending",
      enum: ["pending", "successful", "declined", "failed", "cancelled", "conflict"],
    },
  type: {
      type: String,
      enum: ["bank-transfer", "deposit"],
    },
  reference: { type: String },
}, { timestamps: true });

export default model<ICredit>('credit', creditSchema);