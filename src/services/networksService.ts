import validationError from "../errors/validationError";
import schemaValidation from "../middlewares/schemaValidation";
import { NetworkType } from "../types/networkTypes";
// import Cryptr from "cryptr";
// import dotenv from "dotenv";
import credentialsService from "./credentialsService";
import networkRepository from "../repositories/networksRepository";

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


const networksService = {postNetworks, getNetworks};

export default networksService;