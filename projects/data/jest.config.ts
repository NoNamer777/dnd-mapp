import type { Config } from 'jest';

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!**/index.ts'],
    coverageDirectory: '../../coverage/data-end',
    coverageReporters: ['html', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    displayName: 'data',
    moduleFileExtensions: ['ts', 'js'],
    onlyChanged: false,
    preset: '../../jest.preset.js',
    rootDir: './',
    setupFilesAfterEnv: ['./src/test.ts'],
    testMatch: ['**/*.spec.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

export default config;
