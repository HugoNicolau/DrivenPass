import schemaValidation from "../middlewares/schemaValidation";
import signupRepository from "../repositories/signupRepository";
import { SignUpBody } from "../types/userTypes";
import bcrypt from "bcrypt";
import validationError from "../errors/validationError";
import emailInUseError from "../errors/emailInUseError";

async function signUp(user: SignUpBody):Promise<void> {
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

  await signupRepository.signUp(userEncripted);

  return
}

function encriptPass(password: string):Promise<string> {
  const hash = bcrypt.hash(password, 10);
  return hash;
}

const signupService = { signUp, encriptPass };

export default signupService;
