import { Configuration } from "ts-postgres";

export interface SkvInitOptions {
  prefix?: string;
  dbConfig: Configuration;
  tableName?: string;
}

export interface SkvConfig extends SkvInitOptions {
  prefix: string;
  tableName: string;
}
