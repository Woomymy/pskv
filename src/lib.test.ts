describe("Database tests", () => {
    if (!process.env.POSTGRES_HOST)
        test.only("Skipping tests", async () => {
            console.warn("Skipping other tests");
        });
});
