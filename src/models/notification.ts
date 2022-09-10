import { Schema, model } from "mongoose";
import { INotification } from "../utils/interface";

const notificationSchema = new Schema(
  {
    notification: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    title: { type: String, maxLength: 50 },
    message: { type: String, maxLength: 3000 },
    status: { type: String, enum: ["read", "unread"], default: "unread" },
    sender: { type: String },
    receiver: { type: String },
  },
  { timestamps: true }
);

export default model<INotification>("Notification", notificationSchema);
