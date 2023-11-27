import { Response } from 'express';
import { HelmetOptions } from 'helmet';

export const helmetConfig: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            'script-src': [
                `'unsafe-inline'`,
                `'unsafe-hashes'`,
                (_, response: Response) => `${response.locals.hashes.join(' ')}`,
            ],
            'script-src-attr': [`'unsafe-inline'`],
            'trusted-types': ['angular', 'angular#bundler'],
            'require-trusted-types-for': [`'script'`],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
    },
};
