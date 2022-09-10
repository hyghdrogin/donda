import { Schema, model } from "mongoose";
import { IFeedback } from "../utils/interface";

const feedbackSchema = new Schema({
  feedback: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

export default model<IFeedback>("Feedback", feedbackSchema);
