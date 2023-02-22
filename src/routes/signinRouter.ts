import {Router} from "express";
import signinController from "../controllers/signinController.js";

const signinRouter = Router();
signinRouter.post("/signin", signinController.signIn);

export default signinRouter;