import prisma from "../database/database.js";
import { SignUpBody } from "../types/userTypes.js";


async function getUser(user:SignUpBody){
return prisma.user.findUnique({
    where:{
        email:user.email
    }
})

}

const signinRepository = {getUser}

export default signinRepository;