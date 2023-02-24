// FAZER OS TESTES PARA OS CASOS DE
// NÃO TER TOKEN
// TER TOKEN INVÁLIDO
// TER TOKEN VÁLIDO
    //POST
        //TEM QUE FORNECER NOME, URL, SENHA E TITULO
        //SUCESSO = 201
        //PASSAR PELA CRIPTOGRAFIA?
    //GET
        //TEM QUE VOLTAR VAZIO SE TIVER VAZIO
        //SUCESSO VOLTA UM ARRAY DE OBJETOS E 200
    //GET/:ID
        //TEM QUE DAR NOTFOUND SE NÃO ACHAR O ITEM NO ID DELE
        //SUCESSO VOLTA O ITEM(OBJ) E 200
    //DELETE
        //SE NAO ACHAR O ID NOS ITENS DO USER, VOLTAR NOTFOUND
        //SUCESSO VOLTAR 200

        import app from "../src/index"
        import supertest from "supertest";
        import {generateBody} from "./factories/user.factory"
        import httpStatus from "http-status";
        import { faker } from "@faker-js/faker";
       
        
        const api = supertest(app);
        
        
        describe('POST /networks', () => {
            let token: string;
            let userId: number;
        
            beforeAll(async () => {
                const userBody = await generateBody();
                const response = await api.post('/signup').send(userBody);
                userId = response.body.id;
                const loginResponse = await api.post('/signin').send(userBody);
                token = loginResponse.body.token;
            });
        
            it('Should respond with 201 if network is correctly created', async() => {
                const body = {
                    title: faker.lorem.words(2),
                    network: faker.internet.ip(),
                    password: faker.internet.password(10)
                };
                
                const result = await api.post('/networks').set("Authorization", `Bearer ${token}`).send(body);
        
                expect(result.status).toBe(httpStatus.CREATED)
            });
        
            it('Should respond with 401 if no authentication token is provided', async() => {
                const body = {
                    title: faker.lorem.words(2),
                    network: faker.internet.ip(),
                    password: faker.internet.password(10)
                };
                const result = await api.post('/networks').send(body);
                expect(result.status).toBe(httpStatus.UNAUTHORIZED);
            });
        
            it('Should respond with 401 if invalid authentication token is provided', async() => {
                const body = {
                    title: faker.lorem.words(2),
                    network: faker.internet.ip(),
                    password: faker.internet.password(10)
                };
                const invalidToken = 'invalidToken';
                
                const result = await api.post('/networks').set("Authorization", `Bearer ${invalidToken}`).send(body);
                expect(result.status).toBe(httpStatus.UNAUTHORIZED);
            });
        });
        