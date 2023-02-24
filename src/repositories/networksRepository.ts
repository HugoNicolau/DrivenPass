import prisma from "../database/database";
import { NetworkType } from "../types/networkTypes";

async function postNetworks(networkFull: NetworkType) {
  const { userId, title, network, password } = networkFull;
  return prisma.network.create({
    data: {
      userId,
      title,
      network,
      password,
    },
  });
}

async function getNetworks(userId: number) {
  return prisma.network.findMany({
    where: {
      userId,
    },
  });
}

async function getOneNetwork(userId: number, id: number) {
  return prisma.network.findFirst({
    where: {
      id,
      userId,
    },
  });
}

async function deleteOneNetwork(userId: number, id: number) {
  return prisma.network.deleteMany({
    where: {
      AND: [{ id: id }, { userId: userId }],
    },
  });
}

const networkRepository = {
  postNetworks,
  getNetworks,
  getOneNetwork,
  deleteOneNetwork,
};

export default networkRepository;
