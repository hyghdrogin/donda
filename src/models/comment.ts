import { Schema, model } from "mongoose";
import { IComment } from "../utils/interface";

const commentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String },
  },
  { timestamps: true }
);
export default model<IComment>("Comment", commentSchema);
