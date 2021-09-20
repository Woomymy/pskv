import { createCipheriv } from "crypto";
import { Client } from "ts-postgres";
import { SkvConfig, SkvInitOptions } from "./typings";

export class Skv {
  private options: SkvConfig;
  private dbClient: Client;
  constructor(options: SkvInitOptions) {
    this.options = {
      dbConfig: options.dbConfig,
      tableName: options.tableName ?? "skv",
      prefix: options.prefix ?? "skv",
    };
    this.dbClient = new Client(this.options.dbConfig);
  }

  async connect() {
    await this.dbClient.connect();
    await this.dbClient.query(
      `CREATE TABLE IF NOT EXISTS ${this.options.tableName} (
      key VARCHAR(255),
      value TEXT
    )`
    );
  }
  /**
   * Serializes a data before putting in the DB
   */
  serialize(data: unknown): string {
    if (Buffer.isBuffer(data)) {
      return JSON.stringify(`:b64:${data.toString("base64")}`);
    } else {
      return JSON.stringify(data);
    }
  }
  /**
   * Deserializes data
   */
  deserialize(json: string): unknown {
    const raw = JSON.parse(json);
    if (/^:b64:/.test(raw)) {
      console.log(raw);
      return Buffer.from(raw.substring(5), "base64");
    } else {
      return raw;
    }
  }
}
