import {Router} from "express";
import authFunctions from "../middlewares/authValidation.js";
import credentialsController from "../controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter
.all("/*", authFunctions.auth)
.post("/credentials", credentialsController.postCredentials)

export default credentialsRouter;