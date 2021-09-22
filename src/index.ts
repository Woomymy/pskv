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

interface TestObject {
  name: string;
  t: number;
  tk: {
    te: string;
  };
}
await client.set("name", "value");
await client.set("name2", { name: "hello", t: 5, tk: { te: "hello" } });
await client.set("name3", Buffer.from("io"));

await client.set("arr", ["hello", 5]);

console.log(typeof (await client.get<TestObject>("name2")).t);
console.log((await client.get("name")) == null);
await client.delete("name2");
console.log((await client.get<Array<unknown>>("arr")).length);
setTimeout(async () => {
  await client.clear();
}, 10 * 1000);
