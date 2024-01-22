import { ClientModel } from '@dnd-mapp/data';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { ClientService } from '../../authentication';

const CLIENT_ID_HEADER_NAME = 'Dma-Client-Id';

export type DmaClientRequest = Request & { dmaClient?: ClientModel };

@Injectable()
export class ClientIdHeaderMiddleware implements NestMiddleware {
    constructor(private readonly clientService: ClientService) {}

    async use(request: DmaClientRequest, _: Response, next: (error?: unknown) => void) {
        const header = request.header(CLIENT_ID_HEADER_NAME);

        if (header && header !== 'undefined') {
            const client = await this.clientService.findById(header, false);

            if (client) request.dmaClient = client;
        }
        next();
    }
}
