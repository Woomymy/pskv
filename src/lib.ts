import type { SkvConfig, SkvInitOptions } from "./typings";
import pg from "pg";
import { serialize, deserialize } from "./util/serialize.js";
export class Skv {
    private options: SkvConfig;
    private dbClient: pg.Client;
    constructor(options: SkvInitOptions) {
        this.options = {
            dbConfig: options.dbConfig,
            tableName: options.tableName ?? "skv",
            prefix: options.prefix ?? "skv"
        };
        this.dbClient = new pg.Client(this.options.dbConfig);
    }
    /**
     * Connects client to DB and performs table creation if needed
     * @returns {Promise<pg.QueryResult<unknown>>} - The result of table creation
     */
    async connect(): Promise<pg.QueryResult<unknown>> {
        await this.dbClient.connect();
        return await this.dbClient.query(
            `CREATE TABLE IF NOT EXISTS ${this.options.tableName} (
      key VARCHAR(255) PRIMARY KEY NOT NULL,
      value TEXT
      )`
        );
    }

    /**
     * Gets a value from Store
     * @typeParam T Type of the returned value
     * @param key {string} - Name of the key to get
     * @returns {T | null} - The result of Query
     */
    async get<T>(key: string): Promise<T | null> {
        const iter = await this.dbClient.query(
            `SELECT value FROM ${this.options.tableName} WHERE key = $1`,
            [`${this.options.prefix}:${key}`]
        );
        if (iter.rows[0]) {
            return deserialize(iter.rows[0].value) as unknown as T;
        }
        return null;
    }
    /**
     * Set value in Store
     * @param key {string} - Key
     * @param value {unknown} - Value (MUST be serialisable by JSON.stringify or be a Buffer)
     * @returns {Promise<pg.QueryResult<unknown>>} - Result of the query
     */
    async set(key: string, value: unknown): Promise<pg.QueryResult<unknown>> {
        // Transform data into JSON
        const serialized = serialize(value);
        return this.dbClient.query(
            `INSERT INTO ${this.options.tableName} (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
            [`${this.options.prefix}:${key}`, serialized]
        );
    }
    /**
     * Check if Store contains key
     * @param key {string} - Key to check
     * @returns {Promise<boolean>}
     */
    async has(key: string): Promise<boolean> {
        return !((await this.get(key)) == null);
    }
    /**
     * Deletes a Store in table
     * @param key {string} - Key to delete
     * @returns {Promise<pg.QueryResult<unknown>>}
     */
    async delete(key: string): Promise<pg.QueryResult<unknown>> {
        return this.dbClient.query(
            `DELETE FROM ${this.options.tableName} WHERE key = $1`,
            [`${this.options.prefix}:${key}`]
        );
    }
    /**
     * Clears the Store
     * **WARNING** This is dangerous
     * @returns {Promise<pg.QueryResult<unknown>>}
     */
    async clear(): Promise<pg.QueryResult<unknown>> {
        return this.dbClient.query(`TRUNCATE TABLE ${this.options.tableName}`);
    }
}
export type { SkvInitOptions };
