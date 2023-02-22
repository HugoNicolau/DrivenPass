import { Request, Response } from "express";
import httpStatus from "http-status";
import signinService from "../services/signinService.js";

async function signIn(req: Request, res: Response){
const user = req.body;
try{
    const loginUser = signinService.signIn(user);
    return res.status(httpStatus.CREATED).send(loginUser);
} catch(err){
    console.log(err);
    res.sendStatus(500);
}

}


const signinController = {signIn};

export default signinController;