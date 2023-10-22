import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['./src/app/**/*.ts', '!**/index.ts', '!**/*.module.ts'],
    displayName: 'server',
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['./src/test.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

export default config;
