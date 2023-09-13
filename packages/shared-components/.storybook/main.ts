import type { StorybookConfig } from '@storybook/angular';

export default {
    addons: ['@storybook/addon-styling', '@storybook/addon-controls', '@storybook/addon-docs'],
    core: {
        disableTelemetry: true,
    },
    docs: {
        docsMode: true,
        autodocs: false,
        defaultName: 'docs',
    },
    framework: {
        name: '@storybook/angular',
        options: {},
    },
    stories: ['../**/*.docs.mdx', '../**/*.stories.ts'],
} as StorybookConfig;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
