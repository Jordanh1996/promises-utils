module.exports = {
  testRegex: 'test.*\\.test\\.(ts|js)$',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
};
