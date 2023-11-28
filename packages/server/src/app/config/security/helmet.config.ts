import { Response } from 'express';
import { HelmetOptions } from 'helmet';

export const helmetConfig: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            'default-src': [
                `'self'`,
                (_, response: Response) => response.locals.backEndUrl,
                `'unsafe-inline'`,
                `'unsafe-eval'`,
            ],
            'base-uri': [`'self'`, (_, response: Response) => response.locals.backEndUrl],
            'frame-ancestors': [`'none'`],
            'child-src': [`'none'`],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
};
