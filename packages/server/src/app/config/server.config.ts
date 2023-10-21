import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
    production: Boolean(process.env.PRODUCTION) || false,
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 8080,
    ssl: {
        certPath: process.env.SSL_CERT_PATH,
        keyPath: process.env.SSL_KEY_PATH,
    },
}));
