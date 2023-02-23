import validationError from "../errors/validationError.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import { NetworkType } from "../types/networkTypes.js";
// import Cryptr from "cryptr";
// import dotenv from "dotenv";
import credentialsService from "./credentialsService.js";
import networkRepository from "../repositories/networksRepository.js";

// dotenv.config();
// const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);


async function postNetworks(network:NetworkType, userId:number){
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

async function getNetworks(userId:number){
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

async function getOneNetwork(userId:number, id:number){
    const userNetWork = await networkRepository.getOneNetwork(userId,id);
    const decryptedPassword = await credentialsService.decryptPass(userNetWork.password);
    userNetWork.password = decryptedPassword;

    return userNetWork;
}

async function deleteOneNetwork(userId:number, id:number){
    const deleted = await networkRepository.deleteOneNetwork(userId,id);
    return deleted;
}


const networksService = {postNetworks, getNetworks, getOneNetwork, deleteOneNetwork};

export default networksService;