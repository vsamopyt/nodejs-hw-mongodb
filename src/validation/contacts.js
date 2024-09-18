import Joi from 'joi';
import { typeList, emailRegexp } from '../constants/contacts.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have maximum {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).required(),
  //   email: Joi.string().min(3).max(20).pattern(emailRegexp),
  email: Joi.string().min(3).max(20).pattern(emailRegexp),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
  // .messages({
  //   'any.only': `contactType must be one of the following: ${typeList.join(
  //     ', ')}`,
  // }),
});

export const contactsPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have maximum {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20),
  // email: Joi.string().min(3).max(20).pattern(emailRegexp),
  email: Joi.string().min(3).max(20).pattern(emailRegexp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
  //   .messages({
  //     'any.only': `contactType must be one of the following: ${typeList.join(
  //       ', ',
  //     )}`,
  //   }),
});
