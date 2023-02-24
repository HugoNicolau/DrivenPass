import { ApplicationError } from "../types/errorType";

export default function ServerError(): ApplicationError {
  return {
    name: "ServerError",
    message: "Error",
  };
}
