/* eslint-disable */
export default {
    collectCoverageFrom: ['./src/**/*', '!./**/index.ts'],
    displayName: 'data',
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../jest.preset.js',
    setupFiles: ['./src/setup-test.ts'],
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};
