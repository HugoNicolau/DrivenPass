import { Response } from "express";
import { credentialType } from "../types/credentialTypes.js";
import { AuthenticatedRequest } from "../middlewares/authValidation.js";
import httpStatus from "http-status";
import credentialsService from "../services/credentialsService.js";

async function postCredentials(req:AuthenticatedRequest, res:Response){
     const {userId} = req;
    const credential:credentialType = req.body;

    try{
        const result = credentialsService.postCredentials(credential, userId);

        res.status(httpStatus.CREATED).send(result);
    }catch(err){
        console.log(err);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }


    


}

const credentialsController = {postCredentials};

export default credentialsController;