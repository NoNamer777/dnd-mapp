/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    root: __dirname,
    cacheDir: '../../.vite/authentication-server-ui',
    plugins: [angular(), nxViteTsPaths()],
    test: {
        setupFiles: ['src/testing/setup-test.ts'],
        browser: {
            enabled: true,
            headless: true,
            isolate: true,
            name: 'chromium',
            provider: 'playwright',
        },
        coverage: {
            enabled: true,
            provider: 'istanbul',
            reporter: ['text-summary', ['html', { subdir: 'coverage' }]],
            reportsDirectory: '../../reports/authentication-server-ui/coverage',
            exclude: ['testing/*'],
            thresholds: {
                autoUpdate: true,
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
        ui: mode !== 'ci',
        outputFile: '../../reports/authentication-server-ui/vite/index.html',
        globals: true,
        include: ['src/**/*.spec.ts'],
        reporters: ['dot', 'html'],
    },
}));