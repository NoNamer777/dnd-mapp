import { SessionModel } from '@dnd-mapp/data';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from '../../authentication';
import { LoggerService } from '../logging';

export type DmaSessionRequest = Request & { dmaSession?: SessionModel };

@Injectable()
export class SessionCookieMiddleware implements NestMiddleware {
    constructor(
        private readonly sessionService: SessionService,
        private readonly loggerService: LoggerService
    ) {
        this.loggerService.setContext(SessionCookieMiddleware.name);
    }

    async use(request: DmaSessionRequest, _: Response, next: (error?: unknown) => void) {
        this.loggerService.log('Setting Request Session');
        const cookie = request.signedCookies['SESSION'];

        if (cookie) {
            try {
                request.dmaSession = (await this.sessionService.findById(cookie)) as unknown as SessionModel;
            } catch (error) {
                this.loggerService.warn('Failed to set Session for Request');
            }
        }
        next();
    }
}
