/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  watchPathIgnorePatterns: ['globalConfig'],
};
