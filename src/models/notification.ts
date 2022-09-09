import { Schema, model } from "mongoose";
import { INotification } from "../utils/interface";

const notificationSchema = new Schema({
  notification : { type: String },
  message : { type: String, maxLength: 3000 },
  status : { type: String, enum: ["read", "unread"], default: "unread" },
  title : { type: String, maxLength: 50 },
  sender : { type: String },
  receiver : { type: String },
  user_id : { type: Schema.Types.ObjectId, ref : "user" },
},
 { timestamps: true });

export default model<INotification>('Notification', notificationSchema);