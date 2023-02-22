import signinRepository from "../repositories/signinRepository.js";
import { signUpBody } from "../types/userTypes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


async function signIn(user: signUpBody) {
  const { email, password } = user;
  const userExists = await signinRepository.getUser(user);
  if (!userExists) {
    return console.log("There is not an user with this email adress");
  }
  const confirmPass = comparePass(password, userExists.password);
  if(!confirmPass){
    return console.log("Wrong password, try again!");
  }

  const token = generateToken(userExists.id);
  return token;
}

async function comparePass(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}


async function generateToken(userId:number){
const data = {userId};
const secretKey = process.env.JWT_SECRET;
console.log(data, "datagenerate");
const token = jwt.sign(data, secretKey);
return {token};
}



const signinService = { signIn };

export default signinService;
