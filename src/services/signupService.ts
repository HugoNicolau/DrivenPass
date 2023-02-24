import schemaValidation from "../middlewares/schemaValidation.js";
import signupRepository from "../repositories/signupRepository.js";
import { SignUpBody } from "../types/userTypes.js";
import bcrypt from "bcrypt";
import validationError from "../errors/validationError.js";
import emailInUseError from "../errors/emailInUseError.js";

async function signUp(user: SignUpBody) {
  const { email, password } = user;

  const validate = schemaValidation.validateSignup(user);

  if(validate){
    throw validationError(validate)
}

  const emailExistent = await signupRepository.emailAlreadyInUse(user);
  if (emailExistent) {
    throw emailInUseError();
  }
  const hash = await encriptPass(password);

  const userEncripted = {
    email,
    password: hash,
  };

  const createUser = signupRepository.signUp(userEncripted);

  return createUser;
}

function encriptPass(password: string) {
  const hash = bcrypt.hash(password, 10);
  return hash;
}

const signupService = { signUp, encriptPass };

export default signupService;
