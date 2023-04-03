import { ServerConfigOptions } from '../app/config/validation/interfaces';

export default (): ServerConfigOptions => ({
    production: process.env.SERVER_PRODUCTION === 'true',
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT) || 8080,
    secure: process.env.SERVER_SECURE === 'true',
    ssl:
        process.env.SERVER_SECURE !== 'true'
            ? undefined
            : {
                  cert: process.env.SEVER_SSL_CERT || '',
                  key: process.env.SERVER_SSL_KEY || '',
              },
});
