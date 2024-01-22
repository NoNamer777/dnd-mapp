import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { backEndServerAddress } from '../../common';

type NextFunction = (error?: unknown) => void;

@Injectable()
export class HashCollectorMiddleware implements NestMiddleware {
    private resourceHashes = new Set<string>();

    use(_: Request, response: Response, next: NextFunction) {
        this.getHashes();

        response.locals.hashes = [...this.resourceHashes];
        response.locals.backEndUrl = backEndServerAddress;
        next();
    }

    private getHashes() {
        const file = readFileSync(join(...[__dirname, '..', 'front-end', 'browser', 'index.html']), {
            encoding: 'utf-8',
        });
        const hashes = file.match(/sha384-([A-Za-z0-9/+])*/g);

        hashes.map((hash) => `'${hash}'`).forEach((hash) => this.resourceHashes.add(hash));
    }
}
