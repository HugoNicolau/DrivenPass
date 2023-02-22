import { ApplicationError } from "../types/errorType.js";

export default function titleInUseError(): ApplicationError {
  return {
    name: "TitleInUseError",
    message: "This title is already in use by you",
  };
}
