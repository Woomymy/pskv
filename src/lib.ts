import type { PskvConfig, PskvInitOptions } from "./typings/index.js";
import { Client, ResultIterator } from "ts-postgres";
import { serialize, deserialize } from "./util/serialize.js";
export class Pskv {
    private options: PskvConfig;
    private dbClient: Client;
    constructor(options: PskvInitOptions) {
        this.options = {
            dbConfig: options.dbConfig,
            tableName: options.tableName ?? "pskv",
            prefix: options.prefix ?? "pskv"
        };
        this.dbClient = new Client(this.options.dbConfig);
    }
    /**
     * Connects client to DB and performs table creation if needed
     * @returns {Promise<ResultIterator>>} - The result of table creation
     */
    async connect(): Promise<ResultIterator> {
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
            return deserialize(iter.rows[0][0] as string) as unknown as T;
        }
        return null;
    }
    /**
     * Set value in Store
     * @param key {string} - Key
     * @param value {unknown} - Value (MUST be serialisable by JSON.stringify or be a Buffer)
     * @returns {Promise<ResultIterator>} - Result of the query
     */
    async set(key: string, value: unknown): Promise<ResultIterator> {
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
     * @returns {Promise<ResultIterator>}
     */
    async delete(key: string): Promise<ResultIterator> {
        return this.dbClient.query(
            `DELETE FROM ${this.options.tableName} WHERE key = $1`,
            [`${this.options.prefix}:${key}`]
        );
    }
    /**
     * Clears the Store
     * **WARNING** This is dangerous
     * @returns {Promise<ResultIterator>}
     */
    async clear(): Promise<ResultIterator> {
        return this.dbClient.query(`TRUNCATE TABLE ${this.options.tableName}`);
    }
    /**
     * Ends DB connection
     */
    async end(): Promise<void> {
        await this.dbClient.end();
    }
}
export type { PskvInitOptions };
