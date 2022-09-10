import Joi from "joi";
import objectId from "./common";

export const validateFeedback = {
  body: Joi.object({
    email: Joi.string().email().required(),
    feedback: Joi.string().min(5).max(3000).required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const validateId = {
  params: Joi.object({
    feedbackId: objectId.messages({
      "any.required": "Post is required.",
      "string.length": "Post id must be a valid mongoose id.",
    }).messages({
      "object.unknown": "You have used an invalid key."
    })
  })
};

// export default { validateFeedback, validateId };
