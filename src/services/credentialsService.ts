import titleInUseError from "../errors/titleInUseError";
import validationError from "../errors/validationError";
import schemaValidation from "../middlewares/schemaValidation";
import credentialsRepository from "../repositories/credentialsRepository";
import { CredentialType } from "../types/credentialTypes";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import notFoundError from "../errors/notFoundError";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);

async function postCredentials(credential: CredentialType, userId: number):Promise<CredentialType> {
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

  const newCredential: CredentialType = {
    userId,
    title: credential.title,
    url: credential.url,
    username: credential.username,
    password: hash,
  };

  const result = await credentialsRepository.saveCredential(newCredential);

  return result;
}

async function getCredentials(id: number): Promise<CredentialType[]> {
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

async function getOneCredential(userId:number, id:number): Promise<CredentialType>{
  const userCredential = await credentialsRepository.getOneCredential(userId, id);
  if(!userCredential){
    throw notFoundError();
  }
  const decryptedPassword = await decryptPass(userCredential.password);
  userCredential.password = decryptedPassword;

  return userCredential;
}

async function deleteOneCredential(userId:number, id:number): Promise<void>{
  const deleted = await credentialsRepository.deleteOneCredential(userId, id);
  if(deleted.count==0){
    throw notFoundError();
  }
  return
}

async function encryptPass(password: string):Promise<string> {
  
  const encrypted = cryptr.encrypt(password);
  return encrypted;
}
async function decryptPass(password: string):Promise<string> {
 
  const decrypted = cryptr.decrypt(password);
  return decrypted;
}

const credentialsService = { postCredentials, encryptPass, decryptPass, getCredentials, getOneCredential, deleteOneCredential };

export default credentialsService;
