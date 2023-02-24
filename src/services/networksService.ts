import validationError from "../errors/validationError";
import schemaValidation from "../middlewares/schemaValidation";
import { NetworkType } from "../types/networkTypes";
import credentialsService from "./credentialsService";
import networkRepository from "../repositories/networksRepository";
import notFoundError from "../errors/notFoundError";

async function postNetworks(network:NetworkType, userId:number):Promise<NetworkType>{
const validate = schemaValidation.validateNetwork(network);
if(validate){
    throw validationError(validate);
}

const hash = await credentialsService.encryptPass(network.password);

const newNetwork: NetworkType = {
    userId,
    title: network.title,
    network: network.network,
    password:hash,
}

const result = await networkRepository.postNetworks(newNetwork);

return result;

}

async function getNetworks(userId:number):Promise<NetworkType[]>{
    const userNetworks = await networkRepository.getNetworks(userId);
  
    const newNetworks = userNetworks.map(async(net) => {
        const decryptedPassword = await credentialsService.decryptPass(net.password);
        return {
            ...net,
            password:decryptedPassword
        }
    });
    return Promise.all(newNetworks);

}

async function getOneNetwork(userId:number, id:number):Promise<NetworkType>{
    const userNetWork = await networkRepository.getOneNetwork(userId,id);
    if(!userNetWork){
        throw notFoundError();
    }
    const decryptedPassword = await credentialsService.decryptPass(userNetWork.password);
    userNetWork.password = decryptedPassword;

    return userNetWork;
}

async function deleteOneNetwork(userId:number, id:number):Promise<void>{
    const deleted = await networkRepository.deleteOneNetwork(userId,id);
    if(deleted.count==0){
        throw notFoundError();
    }
    return
}


const networksService = {postNetworks, getNetworks, getOneNetwork, deleteOneNetwork};

export default networksService;