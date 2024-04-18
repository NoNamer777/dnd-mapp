import * as path from 'node:path';
import { Configuration } from 'webpack';

const config: Configuration = {
    resolve: {
        alias: {
            '@dnd-mapp/shared-components/styles': path.join(__dirname, '../shared-components/styles'),
        },
    },
};

export default config;
