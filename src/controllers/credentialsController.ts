import { Response } from "express";
import { CredentialType } from "../types/credentialTypes";
import { AuthenticatedRequest } from "../middlewares/authValidation";
import httpStatus from "http-status";
import credentialsService from "../services/credentialsService";

async function postCredentials(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const credential: CredentialType = req.body;

  try {
    await credentialsService.postCredentials(credential, userId);

    res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    if (err.name === "TitleInUseError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (err.name === "ValidationError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
}

async function getCredentials(req:AuthenticatedRequest, res: Response){
    const {userId} = req;
    try{
        const credentials = await credentialsService.getCredentials(userId);
        res.status(httpStatus.OK).send(credentials);
    }catch(err){
        console.log(err);
        if(err.name==="NotFoundError"){
          return res.status(httpStatus.NOT_FOUND).send(err.message);
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getOneCredential(req:AuthenticatedRequest, res:Response){
  const {userId} = req;
  const id:number = Number(req.params.id);
  try{
    const credential = await credentialsService.getOneCredential(userId, id);
    return res.status(httpStatus.OK).send(credential);
  }catch(err){
    if(err.name==="NotFoundError"){
      return res.status(httpStatus.NOT_FOUND).send(err.message);
    }
    console.log(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteOneCredential(req:AuthenticatedRequest, res:Response){
  const {userId} = req;
  const id:number = Number(req.params.id);
  try{
    await credentialsService.deleteOneCredential(userId,id);
    return res.sendStatus(httpStatus.OK);

  }catch(err){
    console.log(err);
    if(err.name==="NotFoundError"){
      return res.status(httpStatus.NOT_FOUND).send(err.message);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const credentialsController = { postCredentials, getCredentials, getOneCredential, deleteOneCredential };

export default credentialsController;
