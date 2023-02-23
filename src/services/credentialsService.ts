import titleInUseError from "../errors/titleInUseError.js";
import validationError from "../errors/validationError.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import credentialsRepository from "../repositories/credentialsRepository.js";
import { credentialType } from "../types/credentialTypes.js";
import Cryptr from "cryptr"

async function postCredentials(credential:credentialType, userId:number){

    

    const validate = schemaValidation.validateCredential(credential);
    if(validate){
        throw validationError(validate)
    }


    const titleInUse = await credentialsRepository.titleInUseByUser(credential.title);
    if(titleInUse){
        throw titleInUseError();       
    }
    const hash = await encryptr(credential.password);

    const newCredential:credentialType = {
        userId,
        title:credential.title,
        url:credential.url,
        username:credential.username,
        password:hash,
    }

    const result = await credentialsRepository.saveCredential(newCredential);

    return result;
}

async function encryptr(password:string){
    const cryptr = new Cryptr(process.env.CRYPT_SECRET);
    const encrypted = cryptr.encrypt(password);
    return encrypted;
}
async function decryptr(password:string){
    const cryptr = new Cryptr(process.env.CRYPT_SECRET);
    const decrypted = cryptr.encrypt(password);
    return decrypted;
}


const credentialsService = {postCredentials, encryptr, decryptr};

export default credentialsService;