import { BASE64_PREFIX } from "./constants.js";
/**
 * Serializes a data before putting in the DB
 */
export function serialize(data: unknown): string {
    if (Buffer.isBuffer(data)) {
        return JSON.stringify(`${BASE64_PREFIX}${data.toString("base64")}`);
    } else {
        return JSON.stringify(data);
    }
}
/**
 * Deserializes data
 */
export function deserialize(json: string): unknown {
    const raw = JSON.parse(json);
    if (new RegExp(`^${BASE64_PREFIX}`).test(raw)) {
        return Buffer.from(raw.substring(BASE64_PREFIX.length), "base64");
    } else {
        return raw;
    }
}
