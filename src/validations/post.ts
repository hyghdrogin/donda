import Joi from "joi";
import objectId from "./common";

export const validatePost = {
  body: Joi.object({
    post: Joi.string().min(2).max(2000).required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const validateId = {
  params: Joi.object({
    channelId: objectId.messages({
      "any.required": "Channel id is required.",
      "string.length": "Channel id must be a valid mongoose id.",
    })
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};
