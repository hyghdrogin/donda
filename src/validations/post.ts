import Joi from "joi";
import objectId from "./common";

export const validatePost = {
  body: Joi.object({
    post: Joi.string().min(2).max(3000).required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const validateId = {
  params: Joi.object({
    postId: objectId.messages({
      "any.required": "Post is required.",
      "string.length": "Post id must be a valid mongoose id.",
    }),
    commentId: objectId.messages({
      "any.required": "comment is required.",
      "string.length": "comment id must be a valid mongoose id.",
    })
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};
