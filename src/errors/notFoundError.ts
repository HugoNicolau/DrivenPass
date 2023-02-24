import { ApplicationError } from "../types/errorType.js";

export default function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Not found",
  };
}
