# Pskv

Pskv is an interface for key-value storage for PostgreSQL.

## Examples

```typescript
import { Pskv } from "skv";
const client = new Pskv({
    dbConfig: {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: "db"
    },
    prefix: "app", // Prefix for the keys ("namespace"). Default: skv
    tableName: "data_storage" // Name of the table used by Skv to store data (default: skv)
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

## Tests

To run test suite (with jest):

### With docker compose

```docker
docker compose -f docker/docker-compose.test.yml up --abort-on-container-exit
```

## License

Pskv is licensed under the terms of the [MIT](https://opensource.org/licenses/MIT) License.

[Full text of the license](/LICENSE)

### Documentation

Font used in the documentation code blocks is [Iosevka](https://github.com/be5invis/Iosevka) which is licensed under the terms of the SIL Open Font License 1.1. Thanks to the author(s) for creating this cool font!

[Full License text](doc/LICENSE_IOSEVKA.md)
