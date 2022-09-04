import { Schema, model } from "mongoose";
import { IComment } from "../utils/interface";

const commentSchema = new Schema({
  post: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  post_id: { type: Schema.Types.ObjectId, ref: "Post" },
  likes: { type: Number, default: 0 },
  comment: { type: Number, default: 0 },
}, { timestamps: true });

export default model<IComment>("Comment", commentSchema);
