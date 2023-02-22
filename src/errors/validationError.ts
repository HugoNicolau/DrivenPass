import { ApplicationError } from "../types/errorType";


export default function validationError(err):ApplicationError{
    return {
        name: "ValidationError",
        message: err
    }
}