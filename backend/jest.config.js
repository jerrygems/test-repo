module.exports = {
    testEnvironment: 'node',  // Use 'jsdom' if you're testing client-side code
    roots: ['<rootDir>/tests'],  // Base directory for tests
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',   // Look for test files in __tests__ folders
      '**/?(*.)+(spec|test).[tj]s?(x)', // Matches any files that end with .spec.js or .test.js
    ],
    testPathIgnorePatterns: ['/node_modules/'], // Ignore node_modules
  };
  