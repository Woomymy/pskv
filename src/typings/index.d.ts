import pg from "pg";

export interface SkvInitOptions {
  prefix?: string;
  dbConfig: pg.ClientConfig;
  tableName?: string;
}

export interface SkvConfig extends SkvInitOptions {
  prefix: string;
  tableName: string;
}
