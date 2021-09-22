import { Skv } from "./lib.js";

const client = new Skv({
  dbConfig: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "db",
  },
});
try {
  // Initialise SKV
  await client.connect();
} catch (e) {
  console.log(e);
}
