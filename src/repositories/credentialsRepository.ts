import prisma from "../database/database.js";
import { credentialType } from "../types/credentialTypes.js";

async function titleInUseByUser(title: string) {
  return prisma.credential.findFirst({
    where: {
      title,
    },
  });
}

async function saveCredential(credential:credentialType){
    const {userId, title, url, username, password} = credential
    return prisma.credential.create({
        data:{
            userId,
            title,
            url,
            username,
            password
        }
    })
}

async function getCredentials(id:number){
  return prisma.credential.findMany({
    where:{
      userId:id
    }
  })
}

const credentialsRepository = { titleInUseByUser, saveCredential, getCredentials };

export default credentialsRepository;