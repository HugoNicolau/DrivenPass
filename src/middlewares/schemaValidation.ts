import { SignUpBody } from "../types/userTypes";
import { signupSchema, signinSchema } from "../schemas/userSchema";
import { CredentialType } from "../types/credentialTypes";
import { credentialSchema } from "../schemas/credentialSchema";
import { NetworkType } from "../types/networkTypes";
import { networkSchema } from "../schemas/networkSchema";

function validateSignup(user: SignUpBody) {
  const validation = signupSchema.validate(user);
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);

    return errors;
  }
}
function validateSignin(user: SignUpBody) {
  const validation = signinSchema.validate(user);
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);

    return errors;
  }
}

function validateCredential(credential: CredentialType) {
  const validation = credentialSchema.validate(credential);
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  }
}

function validateNetwork(network: NetworkType) {
  const validation = networkSchema.validate(network);
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  }
}

const schemaValidation = {
  validateSignup,
  validateSignin,
  validateCredential,
  validateNetwork,
};

export default schemaValidation;
