import { Router } from "express";
import signinController from "../controllers/signinController";

const signinRouter = Router();
signinRouter.post("/signin", signinController.signIn);

export default signinRouter;
