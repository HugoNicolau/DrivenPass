import {Router} from "express";


const signupRouter = Router();

signupRouter.post("/signup", signUp);




export default signupRouter;