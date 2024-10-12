/// <reference types="karma-jasmine" />
/// <reference types="karma-jasmine-html-reporter" />
/// <reference types="karma-coverage" />

import { Config } from 'karma';
import { join } from 'path';

const isRunningInCI = process.env['NX_TASK_TARGET_TARGET'] === 'ci';

export default (config: Config) => {
    config.set({
        autoWatch: !isRunningInCI,
        autoWatchBatchDelay: 5_000,
        basePath: join(__dirname, '..', '..'),
        browsers: ['ChromeHeadless'],
        coverageReporter: {
            check: {
                global: {
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    statements: 80,
                },
            },
            dir: join(__dirname, '..', '..', '..', '..', 'reports', 'authentication-server-ui'),
            reporters: [{ type: 'html', subdir: '.' }, { type: 'text-summary' }],
        },
        client: {
            jasmine: {
                random: true,
                failSpecWithNoExpectations: isRunningInCI,
            },
        },
        failOnEmptyTestSuite: isRunningInCI,
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        jasmineHtmlReporter: {
            suppressAll: true,
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        reporters: ['progress', 'dots'],
        restartOnFileChange: true,
        singleRun: isRunningInCI,
    });
};
