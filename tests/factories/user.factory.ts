import prisma from "database/database";
import { faker } from "@faker-js/faker";
import { SignUpBody } from "../../src/types/userTypes";
import bcrypt from "bcrypt";

export async function createUser(body:SignUpBody) {
    const {email, password} = body
    const newPassword = password 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newEmail = email 

    return await prisma.user.create({
        data:{
            email: newEmail,
            password: hashedPassword
        }
    })
}
export async function generateBody(){
    const body = {
        email:faker.internet.email(),
        password:faker.internet.password()
    }
    
    return body;
}
