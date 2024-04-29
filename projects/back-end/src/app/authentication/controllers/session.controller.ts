import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { DmaSessionRequest, LoggerService } from '../../common';
import { HasSessionGuard } from '../guards';
import { StateRequest } from '../models';
import { SessionService } from '../services';

@Controller('/session')
export class SessionController {
    constructor(
        private readonly sessionService: SessionService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(SessionController.name);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async retrieve(
        @Body() requestBody: StateRequest,
        @Req() request: DmaSessionRequest,
        @Res({ passthrough: true }) response: Response
    ) {
        this.logger.log('Received request to retrieve a Session');
        const { state } = requestBody;
        let session = request.dmaSession;

        if (!session) {
            session = await this.sessionService.initialize();
        }
        // TODO: Encrypt with SHA256 before sending the ID to increase security
        response.cookie('SESSION', session.id, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            signed: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1_000), // Expires in 7 days (same as the refresh token)
        });

        return { data: session, state: state };
    }

    @UseGuards(HasSessionGuard)
    @Delete(':id')
    async remove(@Param('id') idParam: string, @Res() response: Response) {
        this.logger.log(`Received request to remove Session with ID: '${idParam}'`);
        await this.sessionService.end(idParam);

        response.cookie('SESSION', null);
    }
}
