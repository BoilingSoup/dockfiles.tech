// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const esModules = ["ky"];
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [`/node_modules/(?!(${esModules.join("|")})/)`],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)();
  return {
    ...jestConfig,
    transformIgnorePatterns: jestConfig.transformIgnorePatterns.filter((ptn) => ptn !== "/node_modules/"), // ['^.+\\.module\\.(css|sass|scss)$', '/node_modules/(?!(package1|package2)/']
  };
};
