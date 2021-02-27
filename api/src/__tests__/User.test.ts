import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", async () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    it("Should be able to create a new use", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "user example",
            });
        expect(response.status).toBe(201);
    });



});

