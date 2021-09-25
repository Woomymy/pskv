import pg from "pg";

export interface PskvInitOptions {
    prefix?: string;
    dbConfig: pg.ClientConfig;
    tableName?: string;
}

export interface PskvConfig extends PskvInitOptions {
    prefix: string;
    tableName: string;
}
