import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: (backEndUrl: string) => CorsOptions = (backEndUrl: string) => ({
    origin: [backEndUrl],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
});
