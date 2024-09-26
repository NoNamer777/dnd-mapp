/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    root: __dirname,
    cacheDir: '../../.vite/authentication-server-ui',
    plugins: [angular(), nxViteTsPaths()],
    server: {
        port: 9876,
    },
    test: {
        browser: {
            enabled: true,
            headless: true,
            isolate: true,
            name: 'chromium',
            provider: 'playwright',
        },
        coverage: {
            enabled: true,
            exclude: ['src/testing/*', 'src/app/core/config/*', '**/index.ts'],
            ignoreEmptyLines: true,
            include: ['src/app/*'],
            provider: 'istanbul',
            reporter: ['text-summary', ['html', { subdir: 'coverage', skipEmpty: false }]],
            reportOnFailure: true,
            reportsDirectory: '../../reports/authentication-server-ui',
            skipFull: false,
            thresholds: {
                autoUpdate: false,
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        open: false,
        outputFile: '../../reports/authentication-server-ui/index.html',
        globals: true,
        include: ['src/**/*.spec.ts'],
        reporters: ['default', 'html'],
        setupFiles: ['src/testing/setup-test.ts'],
        ui: mode !== 'ci',
        uiBase: '/',
        watch: mode !== 'ci',
    },
}));
