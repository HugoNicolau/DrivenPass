import { ApplicationError } from "../types/errorType";

export default function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Not found",
  };
}
