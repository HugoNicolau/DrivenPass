import joi from "joi";

export const networkSchema = joi.object({
  title: joi.string().required(),
  network: joi.string().required(),
  password: joi.string().required(),
});