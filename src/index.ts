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

await client.set("name", "value");
await client.set("name2", { name: "hello", t: 5, tk: { te: "hello" } });
await client.set("name3", Buffer.from("io"));

await client.delete("name");

setTimeout(async () => {
  await client.clear();
}, 10 * 1000);
