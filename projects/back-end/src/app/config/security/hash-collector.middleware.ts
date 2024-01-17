import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { buildServerUrl } from '../../common';
import { ServerConfig } from '../environment';

type NextFunction = (error?: unknown) => void;

@Injectable()
export class HashCollectorMiddleware implements NestMiddleware {
    private resourceHashes = new Set<string>();

    constructor(private configService: ConfigService) {}

    use(_: Request, response: Response, next: NextFunction) {
        const { host, port, useSsl, address } = this.configService.get<ServerConfig>('server');
        const backEndUrl = buildServerUrl(host, port, useSsl, address);
        this.getHashes();

        response.locals.hashes = [...this.resourceHashes];
        response.locals.backEndUrl = backEndUrl;
        next();
    }

    private getHashes() {
        const file = readFileSync(join(...[__dirname, '..', 'front-end', 'index.html']), { encoding: 'utf-8' });
        const hashes = file.match(/sha384-([A-Za-z0-9/+])*/g);

        hashes.map((hash) => `'${hash}'`).forEach((hash) => this.resourceHashes.add(hash));
    }
}
