import Joi from 'joi';

export const validateCredit = {
  body: Joi.object({
    amount: Joi.number().required(),
  }).messages({
        "object.unknown": "You have used an invalid key."
})
};
