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

const dt = client.serialize(Buffer.from("io"));
const _dt = client.serialize({ name: "Hello", var: { constant: "fun" } });

console.log("===== BUFFER =====");
console.log(dt);
console.log(client.deserialize(dt));
console.log("===== Object =====");
console.log(_dt);
console.log((client.deserialize(_dt) as any).name);
