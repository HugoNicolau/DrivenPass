import { Response } from "express";
import { credentialType } from "../types/credentialTypes.js";
import { AuthenticatedRequest } from "../middlewares/authValidation.js";
import httpStatus from "http-status";
import credentialsService from "../services/credentialsService.js";

async function postCredentials(req:AuthenticatedRequest, res:Response){
     const {userId} = req;
    const credential:credentialType = req.body;

    try{
        await credentialsService.postCredentials(credential, userId);

        res.sendStatus(httpStatus.CREATED);
    }catch(err){
        console.log(err);
        if(err.name === "TitleInUseError"){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        if(err.name === "ValidationError"){
            return res.status(httpStatus.BAD_REQUEST).send(err.message);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
      
    }


    


}

const credentialsController = {postCredentials};

export default credentialsController;