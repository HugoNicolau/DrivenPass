import {Router} from "express";
import signupController from "../controllers/signupController.js";


const signupRouter = Router();

signupRouter.post("/signup", signupController.signUp);




export default signupRouter;