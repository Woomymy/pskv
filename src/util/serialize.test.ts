import { BASE64_PREFIX, serialize, deserialize } from "./serialize";

test("Serialize works with simple values", async () => {
    // eslint-disable-next-line quotes
    expect(serialize("hello")).toBe('"hello"');
});

test("Serialize works with buffers", async () => {
    // eslint-disable-next-line quotes
    expect(serialize(Buffer.from("io"))).toBe(`"${BASE64_PREFIX}aW8="`);
});

test("Serialize works with objects", async () => {
    expect(serialize({ name: "Hello", test: 4 })).toBe(
        // eslint-disable-next-line quotes
        '{"name":"Hello","test":4}'
    );
});

test("Deserialize works with simple values", async () => {
    // eslint-disable-next-line quotes
    expect(deserialize('"hello"')).toBe("hello");
});

test("Deserialize works with buffers", async () => {
    // eslint-disable-next-line quotes
    expect(deserialize(`"${BASE64_PREFIX}aW8="`)).toStrictEqual(
        Buffer.from("io")
    );
});

test("Deserialize works with objects", async () => {
    // eslint-disable-next-line quotes
    expect(deserialize('{"name":"Hello","test":4}')).toStrictEqual({
        name: "Hello",
        test: 4
    });
});
