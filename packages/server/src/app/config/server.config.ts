import { registerAs } from '@nestjs/config';

function getSslConfig() {
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
    host: process.env.HOST || 'localhost.dndmapp.net',
    port: Number(process.env.PORT) || 443,
    useSsl: Boolean(process.env.USE_SSL) || Boolean(getSslConfig().ssl),
    address: process.env.ADDRESS,
    jwtSecret: process.env.JWT_SECRET,
    ...getSslConfig(),
}));
