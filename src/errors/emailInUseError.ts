import { ApplicationError } from "../types/errorType";

export default function emailInUseError(): ApplicationError {
  return {
    name: "EmailInUseError",
    message: "This email is already in use",
  };
}
