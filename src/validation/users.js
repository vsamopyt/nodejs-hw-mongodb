import Joi from 'joi';
import { regexEmailPattern } from '../constants/users.js';

export const usersSignupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have maximum {#limit} characters',
  }),
  email: Joi.string().pattern(regexEmailPattern).required(),
  password: Joi.string().min(3).required(),
});


export const usersLoginSchema = Joi.object({
    email: Joi.string().pattern(regexEmailPattern).required(),
    password: Joi.string().min(3).required(),
  });

export const requestResetEmailSchema =Joi.object({
  email: Joi.string().pattern(regexEmailPattern).required(),

});

export const resetPasswordSchema =Joi.object({
  password: Joi.string().min(3).required(),
  token: Joi.string().required()

});
