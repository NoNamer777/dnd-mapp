const { composePlugins, withNx } = require('@nx/webpack');
const { basename } = require('path');
const glob = require('glob');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
    config.entry = {
        ...config.entry,
        ...glob.sync(`apps/back-end/db/migrations/*.ts`).reduce((entries, filename) => {
            const migrationName = basename(filename, '.ts');

            return Object.assign({}, entries, { [migrationName]: filename });
        }, {}),
    };

    config.output = {
        ...config.output,
        libraryTarget: 'umd',
        filename: (pathData) => (pathData.chunk.name === 'main' ? '[name].js' : 'db/migrations/[name].js'),
    };
    return config;
});
