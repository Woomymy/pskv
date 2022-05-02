import { Configuration } from "ts-postgres";

export interface PskvInitOptions {
    prefix?: string;
    dbConfig: Configuration;
    tableName?: string;
}

export interface PskvConfig extends PskvInitOptions {
    prefix: string;
    tableName: string;
}
