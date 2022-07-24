import Joi from 'joi';
import { IUser, ILogin } from '../utils/interface';

export const validateSignup = (user: IUser) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16),
    phone: Joi.string().required(),
    photo: Joi.string(),
  });
  return schema.validate(user);
};

export const validateLogin = (login: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(login);
};
export const validateProfile = (user: IUser) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20)
  });
  return schema.validate(user);
};
