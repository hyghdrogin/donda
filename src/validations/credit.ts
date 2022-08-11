import Joi from "joi";

const validateCredit = {
  body: Joi.object({
    amount: Joi.number().required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export default validateCredit;
