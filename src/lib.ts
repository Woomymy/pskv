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
  }
}
