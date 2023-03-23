import Joi from 'joi'

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
})
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
})
export const authSchema = {registerSchema, loginSchema}
