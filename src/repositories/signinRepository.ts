import prisma from "../database/database.js";
import { signUpBody } from "../types/userTypes.js";


async function getUser(user:signUpBody){
return prisma.user.findUnique({
    where:{
        email:user.email
    }
})

}

const signinRepository = {getUser}

export default signinRepository;