import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

const isRunningInCI = process.env['NX_TASK_TARGET_CONFIGURATION'] === 'ci';

export default defineConfig({
    cacheDir: '../../.vite/data',
    plugins: [nxViteTsPaths()],
    root: __dirname,
    test: {
        api: 9876,
        coverage: {
            enabled: false,
            exclude: [],
            include: ['src/lib/*'],
            provider: 'istanbul',
            reporter: ['text-summary', ['html', { subdir: 'coverage', skipEmpty: false }]],
            reportOnFailure: true,
            reportsDirectory: '../../reports/data',
            skipFull: false,
            thresholds: {
                autoUpdate: false,
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        environment: 'node',
        globals: true,
        include: ['src/**/*.spec.ts'],
        open: false,
        passWithNoTests: true,
        reporters: ['dot', ['html', { outputFile: '../../reports/data/index.html' }]],
        setupFiles: [],
        ui: !isRunningInCI,
        uiBase: '/data/',
        watch: !isRunningInCI,
    },
});
