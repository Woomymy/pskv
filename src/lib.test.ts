import { Skv } from "./lib.js";

describe("Database tests", () => {
    if (!process.env.DB_HOST)
        test.only("Skipping tests", async () => {
            console.warn("Skipping other tests");
        });
    const client = new Skv({
        dbConfig: {
            host: process.env.DB_HOST,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER
        }
    });
    test(".set works", async () => {
        await client.connect();
        client.set("name", "Emily");
        expect(await client.get("name")).toBe("Emily");
        await client.end();
    });
});
