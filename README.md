# Skv

Skv is an interface for key-value storage for PostgreSQL.

## Examples

```typescript
import { Skv } from "skv";
const client = new Skv({
  dbConfig: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "db",
  },
  prefix: "app", // Prefix for the keys ("namespace"). Default: skv
  tableName: "data_storage", // Name of the table used by Skv to store data (default: skv)
});

const name = "Emily";
await client.set("name", name); // Sets value
await client.set("name2", "Emmy");
// You can use generics to convert to <Type> in TypeScript
const namefromdb = await client.get<string>("name");
// name === namefromdb: true

await client.has("name");
//true
await client.delete("name");
await client.has("name");
// false

await client.clear();
// Clears all values in DB

await client.has("name2");
// Name2 is undefined
```

## License

Skv is licensed under the terms of the [MIT](https://opensource.org/licenses/MIT) License.

[Full text of the license](/LICENSE)
