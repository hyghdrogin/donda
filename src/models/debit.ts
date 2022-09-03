import { Schema, model } from "mongoose";
import { IDebit } from "../utils/interface";

const debitSchema = new Schema({
  amount: { type: Number },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "successful", "declined", "failed", "cancelled", "conflict"],
  },
  type: {
    type: String,
    enum: ["bank-transfer", "withdrawal"],
  },

}, { timestamps: true });

export default model<IDebit>("debit", debitSchema);
