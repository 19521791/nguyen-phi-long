import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().min(3).max(255).trim().strict().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title is not allowed to be empty',
    'string.min': 'Title length must be at least 3 characters long',
    'string.max': 'Title length must be less than or equal to 255 characters long',
    'string.trim': 'Title must not have leading or trailing whitespace'
  }),
  author: Joi.string().min(3).max(255).trim().strict().messages({
    'any.required': 'Author is required',
    'string.empty': 'Author is not allowed to be empty',
    'string.min': 'Author length must be at least 3 characters long',
    'string.max': 'Author length must be less than or equal to 255 characters long',
    'string.trim': 'Author must not have leading or trailing whitespace'
  }),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).min(0).required(),
  rating: Joi.number().min(0).max(5).optional(),
  stock: Joi.boolean().optional(),
  thumbnail: Joi.string().uri().optional(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().min(3).max(255).trim().strict().messages({
    'string.empty': 'Title is not allowed to be empty',
    'string.min': 'Title length must be at least 3 characters long',
    'string.max': 'Title length must be less than or equal to 255 characters long',
    'string.trim': 'Title must not have leading or trailing whitespace'
  }),
  author: Joi.string().min(3).max(255).trim().strict().messages({
    'string.empty': 'Author is not allowed to be empty',
    'string.min': 'Author length must be at least 3 characters long',
    'string.max': 'Author length must be less than or equal to 255 characters long',
    'string.trim': 'Author must not have leading or trailing whitespace'
  }),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).min(0),
  rating: Joi.number().min(0).max(5),
  stock: Joi.boolean(),
  thumbnail: Joi.string().uri(),
});

