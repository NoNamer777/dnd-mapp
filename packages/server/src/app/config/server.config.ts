import { registerAs } from '@nestjs/config';

function getSSLConfig() {
    if (!process.env.SSL_CERT_PATH && !process.env.SSL_KEY_PATH) return {};

    return {
        ssl: {
            certPath: process.env.SSL_CERT_PATH,
            keyPath: process.env.SSL_KEY_PATH,
        },
    };
}

export default registerAs('server', () => ({
    production: Boolean(process.env.PRODUCTION) || false,
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 8080,
    ...getSSLConfig(),
}));
