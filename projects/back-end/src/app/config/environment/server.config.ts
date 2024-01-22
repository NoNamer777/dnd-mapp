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

interface SslConfig {
    certPath: string;
    keyPath: string;
}

export interface ServerConfig {
    production: boolean;
    host: string;
    port: number;
    useSsl: boolean;
    address: string;
    jwtSecret: string;
    cookieSecret: string;
    ssl?: SslConfig | undefined;
}

export default registerAs('server', () => ({
    production: Boolean(process.env.PRODUCTION) || false,
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT) || (process.env.USE_SSL === 'true' || Boolean(getSslConfig().ssl) ? 443 : 80),
    useSsl: process.env.USE_SSL === 'true' || Boolean(getSslConfig().ssl),
    address: process.env.ADDRESS || 'localhost.dndmapp.net',
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    ...getSslConfig(),
}));
