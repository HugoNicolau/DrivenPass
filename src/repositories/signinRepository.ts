import prisma from "../database/database";
import { SignUpBody } from "../types/userTypes";

async function getUser(user: SignUpBody) {
  return prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
}

const signinRepository = { getUser };

export default signinRepository;
