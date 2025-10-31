export default {
  testEnvironment: 'node',
  verbose: true,
  transform: {}, // let babel handle transformation
  coverageDirectory: 'coverage', // where coverage reports go
  testMatch: ['**/__tests__/**/*.js'], // where test files are stored
  forceExit: true, // Force Jest to exit after tests complete
  detectOpenHandles: false, // Don't detect open handles (faster)
  testTimeout: 10000, // 10 second timeout for tests
};