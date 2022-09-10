import { Schema, model } from "mongoose";
import { IPost } from "../utils/interface";

const postSchema = new Schema({
  post: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  comment: { type: Number, default: 0 },
  image: { type: String },
}, { timestamps: true });

export default model<IPost>("Post", postSchema);
