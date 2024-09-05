// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
    config.set({
        browsers: ['ChromeHeadless'],
        basePath: '',
        client: {
            jasmine: {},
            clearContext: false,
        },
        coverageReporter: {
            dir: '../../coverage/front-end',
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
        },
        failOnEmptyTestSuite: false,
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
        reporters: ['progress', 'kjhtml'],
        restartOnFileChange: true,
    });
};
