import { Request, Response } from "express";
import httpStatus from "http-status";
import signupService from "../services/signupService.js";

async function signUp(req: Request, res: Response){
const user = req.body;
try{
    const createUser = signupService.signUp(user);
    return res.status(httpStatus.CREATED).send(createUser);
} catch(err){
    console.log(err);
    res.sendStatus(500);
}

}


const signupController = {signUp};

export default signupController;