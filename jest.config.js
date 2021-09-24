/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  resolver: "jest-ts-webcompat-resolver",
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "useESM": true,
    }
  },
  testPathIgnorePatterns: ["dist/"],
  transform: {},
  extensionsToTreatAsEsm: [".ts"]
};