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

async function getOneNetwork(req:AuthenticatedRequest, res:Response){
    try{
    const {userId} = req;
    const id:number = Number(req.params.id);
    const result = await networksService.getOneNetwork(userId, id);
        return res.status(httpStatus.OK).send(result);
    }catch(err){
        console.log(err);
        if(err.name==="NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(err.message);
          }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteOneNetwork(req:AuthenticatedRequest, res:Response){
    try{
        const {userId}=req;
        const id:number = Number(req.params.id);
        await networksService.deleteOneNetwork(userId,id);
        return res.sendStatus(httpStatus.OK)
    }catch(err){
        console.log(err);
        if(err.name==="NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(err.message);
          }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const networksController = {postNetworks, getNetworks, getOneNetwork, deleteOneNetwork};

export default networksController;