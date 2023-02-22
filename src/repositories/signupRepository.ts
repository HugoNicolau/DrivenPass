import prisma from "../database/database.js";
import { signUpBody } from "../types/userTypes.js";

async function signUp(user: signUpBody) {
  return prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
}

async function emailAlreadyInUse(user: signUpBody) {
  return prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      email: true,
    },
  });
}

const signupRepository = { signUp, emailAlreadyInUse };

export default signupRepository;
