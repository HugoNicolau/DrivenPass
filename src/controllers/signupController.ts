import { Request, Response } from "express";
import httpStatus from "http-status";
import signupService from "../services/signupService.js";

async function signUp(req: Request, res: Response) {
  const user = req.body;
  try {
    await signupService.signUp(user);
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    if (err.name === "EmailInUseError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const signupController = { signUp };

export default signupController;
