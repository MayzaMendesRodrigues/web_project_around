/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // This is the key part! It tells Jest to use babel-jest to transform files with the .js extension.
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  
  // Make sure to ignore node_modules from transformation to speed up tests
  transformIgnorePatterns: [
    "\\\\node_modules\\\\",
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",
  
};

export default config;