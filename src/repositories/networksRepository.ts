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

async function getNetworks(userId:number){
    return prisma.network.findMany({
        where:{
            userId
        }
    })
}

async function getOneNetwork(userId:number, id:number){
    return prisma.network.findFirst({
        where: {
            id,
            userId
        }
    })
}

const networkRepository=  {postNetworks, getNetworks, getOneNetwork}

export default networkRepository;