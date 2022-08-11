import Joi from "joi";

const objectId = Joi.string()
  .length(24);

export default objectId;
