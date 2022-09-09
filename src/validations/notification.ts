import Joi from "joi";

const validateNotification = {
  body: Joi.object({
    title: Joi.string().min(2).max(50).required(),
    message: Joi.string().min(2).max(3000).required(),
    email: Joi.string().email().required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export default validateNotification;
