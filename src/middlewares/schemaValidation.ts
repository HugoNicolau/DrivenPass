import { signUpBody } from "../types/userTypes.js";
import { signupSchema } from "../schemas/userSchema.js";


function validateSignup(user: signUpBody){
    const validation = signupSchema.validate(user);
    if(validation.error){
        const errors = validation.error.details.map( detail => detail.message);
        
        throw errors;
    }
}

const schemaValidation = {validateSignup}


export default schemaValidation;