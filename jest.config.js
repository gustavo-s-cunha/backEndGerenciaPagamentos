module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testSequencer: "<rootDir>/src/tests/testSequencer.js",
  roots: ["<rootDir>/src/tests"],
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.spec.ts"],
  setupFiles: ["<rootDir>/src/tests/setupTests.ts"]
}