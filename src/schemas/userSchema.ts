import joi from "joi";

export const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10)
});