import signinRepository from "../repositories/signinRepository";
import { SignUpBody } from "../types/userTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import schemaValidation from "../middlewares/schemaValidation";
import validationError from "../errors/validationError";
import notFoundEmailError from "../errors/notFoundEmailError";
import wrongPasswordError from "../errors/wrongPasswordError";

async function signIn(user: SignUpBody): Promise<{token: string;}> {
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
  if (!confirmPass) {

    throw wrongPasswordError();
  }

  const token = generateToken(userExists.id);
  return token;
}

async function comparePass(password: string, hash: string):Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

async function generateToken(userId: number): Promise<{token: string;}> {
  const data = { userId };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(data, secretKey);
  return { token };
}

const signinService = { signIn };

export default signinService;
