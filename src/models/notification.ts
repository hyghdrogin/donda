import { Schema, model } from "mongoose";
import { INotification } from "../utils/interface";

const notificationSchema = new Schema(
  {
    notification: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    message: { type: String },
    status: { type: String, enum: ["read", "unread"], default: "unread" },
    sender: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default model<INotification>("Notification", notificationSchema);
