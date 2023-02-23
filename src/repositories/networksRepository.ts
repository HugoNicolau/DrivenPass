import prisma from "../database/database.js";
import { NetworkType } from "../types/networkTypes.js";

async function postNetworks(networkFull:NetworkType){
    const {userId, title, network, password} = networkFull
    return prisma.network.create({
        data:{
            userId,
            title,
            network,
            password
        }
    })
}


const networkRepository=  {postNetworks}

export default networkRepository;