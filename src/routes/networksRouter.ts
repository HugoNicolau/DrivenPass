import { Router } from "express";
import networksController from "../controllers/networksController.js";
import authFunctions from "../middlewares/authValidation.js";


const networksRouter = Router()
.all("/*", authFunctions.auth)
.post("/networks", networksController.postNetworks)
.get("/networks", networksController.getNetworks)
.get("/networks/:id", networksController.getOneNetwork)


export default networksRouter;