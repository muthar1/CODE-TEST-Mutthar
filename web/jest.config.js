module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Use 'jsdom' for React components
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Ensure setupTests.ts is referenced

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest", // Transform all JS, JSX, TS, TSX files
    "node_modules/variables/.+\\.(js|jsx|ts|tsx)$": "ts-jest", // Transform specific modules if needed
  },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)", // Ignore all node_modules except 'variables'
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS imports
  },
};
