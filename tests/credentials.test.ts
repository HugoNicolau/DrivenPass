// FAZER OS TESTES PARA OS CASOS DE
// NÃO TER TOKEN
// TER TOKEN INVÁLIDO
// TER TOKEN VÁLIDO
//POST
//TEM QUE FORNECER NOME, URL, SENHA E TITULO
//TITULO TEM QUE SER UNICO PRO USER
//SUCESSO = 201
//PASSAR PELA CRuserNameTOGRAFIA?
//GET
//TEM QUE VOLTAR VAZIO SE TIVER VAZIO
//SUCESSO VOLTA UM ARRAY DE OBJETOS E 200
//GET/:ID
//TEM QUE DAR NOTFOUND SE NÃO ACHAR O ITEM NO ID DELE
//SUCESSO VOLTA O ITEM(OBJ) E 200
//DELETE
//SE NAO ACHAR O ID NOS ITENS DO USER, VOLTAR NOTFOUND
//SUCESSO VOLTAR 200
import app from "../src/index";
import supertest from "supertest";
import { generateBody } from "./factories/user.factory";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";

const api = supertest(app);

describe("POST /credentials", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const userBody = await generateBody();
    const response = await api.post("/signup").send(userBody);
    userId = response.body.id;
    const loginResponse = await api.post("/signin").send(userBody);
    token = loginResponse.body.token;
  });

  it("Should respond with 201 if credential is correctly created", async () => {
    const body = {
      title: faker.lorem.words(1),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(result.status).toBe(httpStatus.CREATED);
  });

  it("Should respond with 400 if credential fail schemaValidation", async () => {
    const body = {
      title: faker.lorem.words(2),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(result.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("Should respond with 500 if no body", async () => {
    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });

  it("Should respond with 401 if credential title is repeated", async () => {
    const body = {
      title: faker.lorem.words(1),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("Should respond with 401 if no authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const result = await api.post("/credentials").send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("Should respond with 401 if invalid authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with 401 if invalid authentication is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bear ${invalidToken}`)
      .send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe("GET /credentials", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const userBody = await generateBody();
    const response = await api.post("/signup").send(userBody);
    userId = response.body.id;
    const loginResponse = await api.post("/signin").send(userBody);
    token = loginResponse.body.token;
  });

  it("Should respond with 200 if get credentials correctly", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const result = await api
      .get("/credentials")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toBe(httpStatus.OK);
  });

  it("Should respond with 401 if no authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const result = await api.get("/credentials").send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("Should respond with 401 if invalid authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .get("/credentials")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with 401 if invalid authentication is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .get("/credentials")
      .set("Authorization", `Bear ${invalidToken}`)
      .send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe("GET /credentials/:id", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const userBody = await generateBody();
    const response = await api.post("/signup").send(userBody);
    userId = response.body.id;
    const loginResponse = await api.post("/signin").send(userBody);
    token = loginResponse.body.token;
  });

  it("Should respond with 200 if get credentials correctly with correct id", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const result1 = await api
      .get(`/credentials/${result.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result1.status).toBe(httpStatus.OK);
  });
  it("Should respond with 404 if given wrong id", async () => {
   
    const result1 = await api
      .get(`/credentials/${0}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result1.status).toBe(httpStatus.NOT_FOUND);
  });

  it("Should respond with 401 if no authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const result = await api.get(`/credentials/${0}`).send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("Should respond with 401 if invalid authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .get(`/credentials/${0}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with 401 if invalid authentication is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .get(`/credentials/${0}`)
      .set("Authorization", `Bear ${invalidToken}`)
      .send(body);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe("DELETE /credentials/:id", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const userBody = await generateBody();
    const response = await api.post("/signup").send(userBody);
    userId = response.body.id;
    const loginResponse = await api.post("/signin").send(userBody);
    token = loginResponse.body.token;
  });

  it("Should respond with 200 if delete credentials correctly with correct id", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const result1 = await api
      .delete(`/credentials/${result.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result1.status).toBe(httpStatus.OK);
  });
  it("Should respond with 404 if given wrong id", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const result1 = await api
      .delete(`/credentials/${0}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result1.status).toBe(httpStatus.NOT_FOUND);
  });

  it("Should respond with 401 if no authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    const result1 = await api
      .delete(`/credentials/${result.body.id}`)
      .send(body);
    expect(result1.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("Should respond with 401 if invalid authentication token is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    const result1 = await api
      .get(`/credentials/${result.body.id}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(body);
    expect(result1.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with 401 if invalid authentication is provided", async () => {
    const body = {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };
    const invalidToken = "invalidToken";

    const result = await api
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const result1 = await api
      .get(`/credentials/${result.body.id}`)
      .set("Authorization", `Bear ${invalidToken}`)
      .send(body);
    expect(result1.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
