/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

const isRunningInCI = process.env['NX_TASK_TARGET_CONFIGURATION'] === 'ci';

export default defineConfig({
    cacheDir: '../../.vite/authentication-server-ui',
    plugins: [angular(), nxViteTsPaths()],
    root: __dirname,
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
        ui: !isRunningInCI,
        uiBase: '/',
        watch: !isRunningInCI,
    },
});
