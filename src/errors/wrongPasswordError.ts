import { ApplicationError } from "../types/errorType.js";

export default function wrongPasswordError(): ApplicationError {
  return {
    name: "WrongPasswordError",
    message: "Your password is wrong, please try again!",
  };
}
