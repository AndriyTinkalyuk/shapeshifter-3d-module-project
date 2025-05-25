export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
 transform: {
  '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }],
},
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
