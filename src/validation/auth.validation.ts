import Joi from 'joi'

export const authShema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
})
