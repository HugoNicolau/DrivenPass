import { AuthenticatedRequest } from "../middlewares/authValidation.js";
import { Response } from "express";
import { NetworkType } from "../types/networkTypes.js";
import httpStatus from "http-status";
import networksService from "../services/networksService.js";

async function postNetworks(req: AuthenticatedRequest, res:Response){
    const {userId} = req;
    const network:NetworkType = req.body;

    try{
        await networksService.postNetworks(network, userId);
    }catch(err){
        console.log(err);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


const networksController = {postNetworks};

export default networksController;