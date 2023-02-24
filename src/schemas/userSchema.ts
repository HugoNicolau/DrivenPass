import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

export const signinSchema = joi.object({
  email:joi.string().email().required(),
  password:joi.string().required()
})