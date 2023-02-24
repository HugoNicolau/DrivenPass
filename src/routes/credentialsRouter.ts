import { Router } from "express";
import authFunctions from "../middlewares/authValidation";
import credentialsController from "../controllers/credentialsController";

const credentialsRouter = Router();

credentialsRouter
  .all("/*", authFunctions.auth)
  .post("/credentials", credentialsController.postCredentials)
  .get("/credentials", credentialsController.getCredentials)
  .get("/credentials/:id", credentialsController.getOneCredential)
  .delete("/credentials/:id", credentialsController.deleteOneCredential);

export default credentialsRouter;
