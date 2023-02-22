import { ApplicationError } from "../types/errorType.js";

export default function notFoundEmailError(): ApplicationError {
  return {
    name: "NotFoundEmailError",
    message: "Email not found",
  };
}
