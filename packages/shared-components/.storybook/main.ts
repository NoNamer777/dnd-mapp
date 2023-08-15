import type { StorybookConfig } from '@storybook/angular';

export default {
    addons: ['@storybook/addon-styling'],
    core: {
        disableTelemetry: true,
    },
    framework: {
        name: '@storybook/angular',
        options: {},
    },
    stories: ['../**/*.stories.@(ts|tsx|mdx)'],
} as StorybookConfig;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
