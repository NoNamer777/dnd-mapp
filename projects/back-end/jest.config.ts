import type { Config } from 'jest';

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!**/*.controller.ts',
        '!**/*.repository.ts',
        '!**/*.module.ts',
        '!**/*.filter.ts',
        '!**/index.ts',
        '!**/common/**/*',
        '!**/config/**/*',
        '!src/main.ts',
    ],
    coverageDirectory: '../../coverage/back-end',
    coverageReporters: ['html', 'text-summary'],
    displayName: 'back-end',
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
