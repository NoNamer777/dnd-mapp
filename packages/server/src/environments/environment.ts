import { ServerConfigOptions } from '../app/config/validation/interfaces';

export default (): ServerConfigOptions => ({
    production: process.env.SERVER_PRODUCTION === 'true',
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT) || 8080,
});
