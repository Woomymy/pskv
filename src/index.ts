import { SkvConfig, SkvInitOptions } from "./typings";

export { version as VERSION } from "../package.json";

export class Skv {
  options: SkvConfig;
  constructor(options: SkvInitOptions) {
    this.options = {
      dbConfig: options.dbConfig,
      tableName: options.tableName ?? "skv",
      prefix: options.prefix ?? "skv",
    };
  }
}
