import { NxWebpackPlugin } from '@nx/webpack';
import * as path from 'node:path';
import { Configuration } from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

const config: Configuration = {
    output: {
        path: path.join(__dirname, '../../dist/back-end'),
        filename: 'main.js',
    },
    plugins: [
        new NxWebpackPlugin({
            assets: [
                './src/assets',
                {
                    input: path.join(__dirname, '../shared-components/src/assets'),
                    glob: '**/*',
                    output: '/assets',
                },
            ],
            baseHref: '/',
            compiler: 'tsc',
            main: './src/main.ts',
            outputPath: 'dist/back-end',
            outputFileName: 'main.js',
            target: 'node',
            tsConfig: './tsconfig.app.json',
            ...(isProduction
                ? {
                      externalDependencies: [
                          '@fastify/static',
                          '@nestjs/microservices',
                          '@nestjs/microservices/microservices-module',
                          '@nestjs/websockets',
                          '@nestjs/websockets/socket-module',
                      ],
                      extractLicenses: true,
                      generatePackageJson: true,
                      optimization: true,
                      vendorChunk: false,
                      namedChunks: false,
                      sourceMap: false,
                      watch: false,
                  }
                : {
                      externalDependencies: 'all',
                      extractLicenses: false,
                      generatePackageJson: false,
                      optimization: false,
                      vendorChunk: true,
                      namedChunks: true,
                      sourceMap: true,
                      watch: true,
                  }),
        }),
    ],
    watch: !isProduction,
};

export default config;
