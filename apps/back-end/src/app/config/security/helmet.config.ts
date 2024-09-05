import { Response } from 'express';
import { HelmetOptions } from 'helmet';

export const helmetConfig: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            'default-src': [`'self'`],
            'base-uri': [(_, response: Response) => response.locals.backEndUrl],
            'frame-ancestors': [`'none'`],
            'child-src': [`'none'`],
            'script-src': [`'self'`, (_, response: Response) => `${response.locals.hashes.join(' ')}`],
            'script-src-attr': null,
            'script-src-elem': null,
            // TODO: Replace `'unsafe-inline'` with `'nonce-xxx'` once a good way to add nonce values to each request for requested style resources has been established
            'style-src': [`'self'`, `'unsafe-inline'`],
            'font-src': [`'self'`],
            'img-src': [`'self'`, 'data:'],
            'object-src': [`'none'`],
            'form-action': [`'none'`],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
};
