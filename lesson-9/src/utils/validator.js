import Joi from "joi";

let phoneNumRegex = /^9989[012345789][0-9]{7}$/

const firstname = Joi.string().min(3).max(100).required().messages({
    "string.base": "Firstname must be string",
    "string.empty": "Firstname cannot be empty",
    "string.min": "Firstname min length 3",
    "string.max": "Firstname max length 100",
    "any.required": "Firstname is required",
})
const lastname =  Joi.string().min(3).max(100).required().messages({
    "string.base": "Lastname must be string",
    "string.empty": "Lastname cannot be empty",
    "string.min": "Lastname min length 3",
    "string.max": "Lastname max length 100",
    "any.required": "Lastname is required",
})
const email = Joi.string().email().required().messages({
    "string.base": "Email must be string",
    "string.empty": "Email cannot be empty",
    "string.email": "Value is not email",
    "any.required": "Email is required",
})
const phone = Joi.string().pattern(phoneNumRegex).required().messages({
    "string.base": "Phone number must be string",
    "string.empty": "Phone number cannot be empty",
    "string.pattern.base": "Invalid phone number",
    "any.required": "Phone number is required",
})
const password = Joi.string().min(3).max(20).required().messages({
    "string.base": "Password must be string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password min length 3",
    "string.max": "Password max length 20",
    "any.required": "Password is required",  
})
export const customerSchema = Joi.object({firstname, lastname, email, password, phone});
export const customerLoginSchema = Joi.object({email, password})