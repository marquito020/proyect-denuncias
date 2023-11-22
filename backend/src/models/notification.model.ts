import { Schema, model } from "mongoose";
import { Notification } from "../interfaces/notification.interface.js";

const NotificationSchema = new Schema<Notification>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    personId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NotificationModel = model("Notification", NotificationSchema);

export default NotificationModel;
