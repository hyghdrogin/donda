import Joi from "joi";
import objectId from "./common";

export const validateNotification = {
  body: Joi.object({
    title: Joi.string().min(2).max(50).required(),
    message: Joi.string().min(2).max(3000).required(),
    userId: Joi.string(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const validateNotificationId = {
  params: Joi.object({
    notificationId: objectId.messages({
      "any.required": "Notification is required.",
      "string.length": "Notification id must be a valid mongoose id.",
    }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};
