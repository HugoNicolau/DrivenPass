import schemaValidation from "../middlewares/schemaValidation.js";
import signupRepository from "../repositories/signupRepository.js";
import { signUpBody } from "../types/userTypes.js";
import bcrypt from "bcrypt";

async function signUp(user: signUpBody) {
  const { email, password } = user;

  schemaValidation.validateSignup(user);

  const emailExistent = await signupRepository.emailAlreadyInUse(user);
  if (emailExistent) {
    return console.log("Email já existe", emailExistent);
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

const signupService = { signUp };

export default signupService;
