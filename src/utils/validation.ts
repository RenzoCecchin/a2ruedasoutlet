import Joi from 'joi';

export const authValidation = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),

  verifyEmail: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  }),
};

export function validateRequest(schema: Joi.ObjectSchema, data: any) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const details = error.details.map((d) => d.message).join(', ');
    throw new Error(`Validación fallida: ${details}`);
  }

  return value;
}
