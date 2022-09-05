import Joi from "joi";
import objectId from "./common";

const validateUser = {
  query: Joi.object({
    type: Joi.string().valid("activate", "deactivate")
  }),
  params: Joi.object({
    userId: objectId.messages({
      "any.required": "userId is required.",
      "string.length": "userId id must be a valid mongoose id.",
    })
  })
    .messages({
      "object.unknown": "You have used an invalid key."
    })
};

export default validateUser;
