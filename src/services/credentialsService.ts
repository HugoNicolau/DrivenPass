import credentialsRepository from "../repositories/credentialsRepository.js";
import { credentialType } from "../types/credentialTypes.js";
import signupService from "./signupService.js";

async function postCredentials(credential:credentialType, userId:number){

    const titleInUse = await credentialsRepository.titleInUseByUser(credential.title);
    if(titleInUse){
        return console.log("title already in use by you");
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