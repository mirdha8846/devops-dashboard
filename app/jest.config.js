 export default{
  testEnvironment: 'node',
  verbose: true,
   transform: {}, // let babel handle transformation
  coverageDirectory: 'coverage', // where coverage reports go
  testMatch: ['**/__tests__/**/*.js'], // where test files are stored
//   setupFilesAfterEnv: ['./jest.setup.js'], // extra setup (like mock DB)
};