import { Skv } from "./lib.js";

describe("Database tests", () => {
    if (!process.env.DB_HOST)
        test.only("Skipping tests", async () => {
            console.warn("Skipping other tests");
        });
});
