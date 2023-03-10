import { Request, Response } from "express";
import httpStatus from "http-status";
import signinService from "../services/signinService";

async function signIn(req: Request, res: Response) {
  const user = req.body;
  try {
    const loginUser = await signinService.signIn(user);
    return res.status(httpStatus.OK).send(loginUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    if (err.name === "NotFoundEmailError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    if (err.name === "WrongPasswordError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const signinController = { signIn };

export default signinController;
