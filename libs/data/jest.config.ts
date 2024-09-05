/* eslint-disable */
export default {
    collectCoverageFrom: ['./src/**/*', '!./**/index.ts'],
    displayName: 'data',
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};
