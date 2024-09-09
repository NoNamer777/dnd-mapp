import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
import { join } from 'path';

export default defineConfig({
    ...nxE2EPreset(__filename, { testDir: join(__dirname, 'tests') }),
    outputDir: '../../reports/authentication-server-ui/e2e',
    use: {
        baseURL: 'https://localhost:4300',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npx nx serve authentication-server-ui',
        reuseExistingServer: !process.env['CI'],
        cwd: workspaceRoot,
        port: 4300,
    },
    reporter: [
        ['dot'],
        [
            'html',
            {
                outputFolder: '../../reports/authentication-server-ui/e2e',
            },
        ],
    ],
    testMatch: 'apps/authentication-server-ui-e2e/tests/**/*.spec.ts',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
