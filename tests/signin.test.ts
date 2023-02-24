// // FAZER OS TESTES PARA OS CASOS DE
//     //SIGNIN COM EMAIL E SENHA CERTOS
//         //TEM QUE RECEBER TOKEN E SUCESSO = 200
//     //SIGNIN COM EMAIL INEXISTENTE
//     //SIGNIN COM SENHA ERRADA
import app from "../src/index"
import supertest from "supertest";
import {createUser, generateBody} from "./factories/user.factory"
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";



const api = supertest(app);


describe('POST /signin', () => {

    it('Should respond with 200 if user exists and body is right', async() => {
        
        const body = await generateBody();
        const resp = await createUser(body)
      
        const result = await api.post('/signin').send(body);

        expect(result.status).toBe(httpStatus.OK)
    })

    it('Should respond with 400 if body wrong (validation fail) ', async() => {
        const body = {
            emai:faker.internet.email(),
            password:faker.internet.password(5)
        }
        const result = await api.post('/signin').send(body);
        expect(result.status).toBe(httpStatus.BAD_REQUEST)
    })

    it('Should respond with 400 if dont find email', async() => {
        const body = {
            email:faker.internet.email(),
            password:faker.internet.password(10)
        }
        const result = await api.post('/signin').send(body);
        expect(result.status).toBe(httpStatus.BAD_REQUEST)
    })

    it('Should respond with 400 if password is wrong', async() => {
        const body = await generateBody();
        const user = createUser(body);
        
        const tryLoginUser = {
            email:body.email,
            password:"111"
        }
        const result = await api.post('/signin').send(tryLoginUser);
        expect(result.status).toBe(httpStatus.BAD_REQUEST)
    })
})


