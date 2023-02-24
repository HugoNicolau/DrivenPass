import { Router } from "express";
import networksController from "../controllers/networksController";
import authFunctions from "../middlewares/authValidation";

const networksRouter = Router()
  .all("/*", authFunctions.auth)
  .post("/networks", networksController.postNetworks)
  .get("/networks", networksController.getNetworks)
  .get("/networks/:id", networksController.getOneNetwork)
  .delete("/networks/:id", networksController.deleteOneNetwork);

export default networksRouter;
