import { Pskv } from "./lib.js";

describe("Database tests", () => {
    if (!process.env.DB_HOST)
        test.only("Skipping tests", async () => {
            console.warn("Skipping other tests");
        });

    afterAll(async () => {
        await client.end();
    });
    const client = new Pskv({
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
    });

    test(".get returns null when value doesn't exist", async () => {
        expect(await client.get("somenonexistentvalue")).toBeNull();
    });

    test(".has works as expected", async () => {
        await client.set("hastest", "iio");
        expect(await client.has("hastest")).toBeTruthy();
    });

    test(".delete works as expected", async () => {
        await client.set("deletetest", "Hello, world");
        await client.delete("deletetest");
        expect(await client.has("deletetest")).toBeFalsy();
    });

    test(".clear works as expected", async () => {
        await client.set("cleartest1", "i");
        await client.set("cleartest2", "o");
        await client.clear();
        expect(
            (await client.has("cleartest1")) && (await client.has("cleartest2"))
        ).toBeFalsy();
    });
});
