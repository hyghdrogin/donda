import Joi from "joi";

const validateDebit = {
  body: Joi.object({
    amount: Joi.number().required(),
    account: Joi.string().required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export default validateDebit;
