import prisma from "../database/database.js";
import { CredentialType } from "../types/credentialTypes.js";

async function titleInUseByUser(title: string) {
  return prisma.credential.findFirst({
    where: {
      title,
    },
  });
}

async function saveCredential(credential: CredentialType) {
  const { userId, title, url, username, password } = credential;
  return prisma.credential.create({
    data: {
      userId,
      title,
      url,
      username,
      password,
    },
  });
}

async function getCredentials(id: number) {
  return prisma.credential.findMany({
    where: {
      userId: id,
    },
  });
}

async function getOneCredential(userId: number, id: number) {
  return prisma.credential.findFirst({
    where: {
      id,
      userId,
    },
  });
}

async function deleteOneCredential(userId: number, id: number) {
  return prisma.credential.deleteMany({
    where: {
      AND: [{ id: id }, { userId: userId }],
    },
  });
}

const credentialsRepository = {
  titleInUseByUser,
  saveCredential,
  getCredentials,
  getOneCredential,
  deleteOneCredential
};

export default credentialsRepository;
