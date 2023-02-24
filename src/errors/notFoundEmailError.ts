import { ApplicationError } from "../types/errorType";

export default function notFoundEmailError(): ApplicationError {
  return {
    name: "NotFoundEmailError",
    message: "Email not found",
  };
}
