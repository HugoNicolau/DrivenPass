import titleInUseError from "../errors/titleInUseError.js";
import validationError from "../errors/validationError.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import credentialsRepository from "../repositories/credentialsRepository.js";
import { credentialType } from "../types/credentialTypes.js";
import signupService from "./signupService.js";

async function postCredentials(credential:credentialType, userId:number){

    const validate = schemaValidation.validateCredential(credential);
    if(validate){
        throw validationError(validate)
    }


    const titleInUse = await credentialsRepository.titleInUseByUser(credential.title);
    if(titleInUse){
        throw titleInUseError();       
    }
    const hash = await signupService.encriptPass(credential.password);

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




const credentialsService = {postCredentials};

export default credentialsService;