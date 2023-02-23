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
        return res.sendStatus(httpStatus.CREATED);
    }catch(err){
        console.log(err);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getNetworks(req: AuthenticatedRequest, res:Response){
    const {userId} = req;
    try{
        const result = await networksService.getNetworks(userId);
        return res.status(httpStatus.OK).send(result)
    }catch(err){
        console.log(err);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


const networksController = {postNetworks, getNetworks};

export default networksController;