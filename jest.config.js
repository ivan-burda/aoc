module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Path to your tsconfig.json file
    }],
  },
  moduleFileExtensions: ['ts', 'js'],
};