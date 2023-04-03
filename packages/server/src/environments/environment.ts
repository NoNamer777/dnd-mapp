export const environment = {
    production: process.env.SERVER_PRODUCTION || true,
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 8080,
};
