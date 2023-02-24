import signinRepository from "../repositories/signinRepository.js";
import { SignUpBody } from "../types/userTypes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import schemaValidation from "../middlewares/schemaValidation.js";
import validationError from "../errors/validationError.js";
import notFoundEmailError from "../errors/notFoundEmailError.js";
import wrongPasswordError from "../errors/wrongPasswordError.js";

async function signIn(user: SignUpBody) {
  const { email, password } = user;

  const validate = schemaValidation.validateSignin(user);
  if (validate) {
    throw validationError(validate);
  }

  const userExists = await signinRepository.getUser(user);
  if (!userExists) {

    throw notFoundEmailError();
  }
  const confirmPass = await comparePass(password, userExists.password);
  console.log("confirmapassresult", confirmPass)
  if (!confirmPass) {

    throw wrongPasswordError();
  }

  const token = generateToken(userExists.id);
  return token;
}

async function comparePass(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

async function generateToken(userId: number) {
  const data = { userId };
  const secretKey = process.env.JWT_SECRET;
  console.log(data, "datagenerate");
  const token = jwt.sign(data, secretKey);
  return { token };
}

const signinService = { signIn };

export default signinService;
