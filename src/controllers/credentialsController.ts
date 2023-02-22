import { Response } from "express";
import { credentialType } from "../types/credentialTypes.js";
import { AuthenticatedRequest } from "../middlewares/authValidation.js";
import httpStatus from "http-status";

async function postCredentials(req:AuthenticatedRequest, res:Response){
     const {userId} = req;
    const credential:credentialType = req.body;

    try{

    }catch(err){
        console.log(err);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }


    //Ver se o titulo é unico para cada user (ou seja, outros users podem usar esse nome tranquilamente)
    //Encriptar a senha
    //Salvar o dado com o userId e com a senha encriptada


}

const credentialsController = {postCredentials};

export default credentialsController;