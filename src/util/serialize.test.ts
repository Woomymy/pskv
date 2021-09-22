import { BASE64_PREFIX, serialize } from "./serialize";

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
