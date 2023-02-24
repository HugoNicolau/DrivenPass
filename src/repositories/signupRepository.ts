import prisma from "../database/database";
import { SignUpBody } from "../types/userTypes";

async function signUp(user: SignUpBody) {
  return prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
}

async function emailAlreadyInUse(user: SignUpBody) {
  return await prisma.user.findUnique({
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
