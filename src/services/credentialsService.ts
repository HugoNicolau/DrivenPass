import titleInUseError from "../errors/titleInUseError.js";
import validationError from "../errors/validationError.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import credentialsRepository from "../repositories/credentialsRepository.js";
import { credentialType } from "../types/credentialTypes.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);

async function postCredentials(credential: credentialType, userId: number) {
  const validate = schemaValidation.validateCredential(credential);
  if (validate) {
    throw validationError(validate);
  }

  const titleInUse = await credentialsRepository.titleInUseByUser(
    credential.title
  );
  if (titleInUse) {
    throw titleInUseError();
  }
  const hash = await encryptPass(credential.password);

  const newCredential: credentialType = {
    userId,
    title: credential.title,
    url: credential.url,
    username: credential.username,
    password: hash,
  };

  const result = await credentialsRepository.saveCredential(newCredential);

  return result;
}

async function getCredentials(id: number) {
    const userCredentials = await credentialsRepository.getCredentials(id);
    const newCredentials = userCredentials.map(async (credential) => {
      const decryptedPassword = await decryptPass(credential.password);
      return {
        ...credential,
        password: decryptedPassword
      }
    });
    return Promise.all(newCredentials);
}

async function getOneCredential(userId:number, id:number){
  const userCredential = await credentialsRepository.getOneCredential(userId, id);
  
  const decryptedPassword = await decryptPass(userCredential.password);
  userCredential.password = decryptedPassword;

  return userCredential;
}

async function encryptPass(password: string) {
  
  const encrypted = cryptr.encrypt(password);
  return encrypted;
}
async function decryptPass(password: string) {
 
  const decrypted = cryptr.decrypt(password);
  return decrypted;
}

const credentialsService = { postCredentials, encryptPass, decryptPass, getCredentials, getOneCredential };

export default credentialsService;
