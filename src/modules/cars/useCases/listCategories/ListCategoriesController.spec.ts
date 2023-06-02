import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";
import { app } from "shared/infra/http/app";
import createConnection from "shared/infra/typeorm";
import request from "supertest";
import { Connection } from "typeorm";

let connection: Connection;
describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = randomUUID();

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at,
    drive_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 
    'XXXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category supertest");
  });
});
