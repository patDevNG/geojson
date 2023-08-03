/* eslint-disable no-undef */
/* eslint-disable quotes */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.(test|spec).ts"],
  verbose: true,
  // forceExit: true,
  clearMocks: true,
  setupFiles: ["./jest.setup.ts"]
};