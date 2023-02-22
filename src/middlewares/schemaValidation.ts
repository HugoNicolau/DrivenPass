import { signUpBody } from "../types/userTypes.js";
import { signupSchema } from "../schemas/userSchema.js";
import { credentialType } from "../types/credentialTypes.js";
import { credentialSchema } from "../schemas/credentialSchema.js";


function validateSignup(user: signUpBody){
    const validation = signupSchema.validate(user);
    if(validation.error){
        const errors = validation.error.details.map( detail => detail.message);
        
        return errors;
    }
}

function validateCredential(credential:credentialType){
    const validation = credentialSchema.validate(credential);
    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message)
        return errors;
    }
}

const schemaValidation = {validateSignup, validateCredential}


export default schemaValidation;