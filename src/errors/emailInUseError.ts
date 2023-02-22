import { ApplicationError } from "../types/errorType.js";

export default function emailInUseError(): ApplicationError {
  return {
    name: "EmailInUseError",
    message: "This email is already in use",
  };
}
