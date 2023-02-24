import app from "../src/index"
import supertest from "supertest";
import {createUser, generateBody} from "./factories/user.factory"
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import prisma from "database/database";



const api = supertest(app);

beforeEach( async () => {
    await prisma.user.deleteMany({})
})

describe('POST /signup', () => {

    it('Should respond with 201 if user is correctly created', async() => {
        
        const body = await generateBody();

        const result = await api.post('/signup').send(body);

        expect(result.status).toBe(httpStatus.CREATED)
    })

    it('Should respond with 400 if validation error in password', async() => {
        const body = {
            email:faker.internet.email(),
            password:faker.internet.password(5)
        }
        const result = await api.post('/signup').send(body);
        expect(result.status).toBe(httpStatus.BAD_REQUEST)
    })

    it('Should respond with 400 if validation error in email', async() => {
        const body = {
            email:faker.internet.userName,
            password:faker.internet.password(10)
        }
        const result = await api.post('/signup').send(body);
        expect(result.status).toBe(httpStatus.BAD_REQUEST)
    })

    it('Should respond with 400 if email is already in use', async() => {
        const body = await generateBody();
        console.log(body)
        const user = await createUser(body);
        console.log(user)
        const result = await api.post('/signup').send(body);
        expect(result.status).toBe(httpStatus.BAD_REQUEST)
    })
    it('Should respond with 500 if dont send body', async() => {
        
        const result = await api.post('/signup');
        expect(result.status).toBe(httpStatus.INTERNAL_SERVER_ERROR)
    })
})


