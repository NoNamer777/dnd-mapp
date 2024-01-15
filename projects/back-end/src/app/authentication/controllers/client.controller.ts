import { Controller, Delete, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DndMappLoggerService } from '../../common';
import { RegisterQueryParamsDto } from '../models';
import { ClientService } from '../services';

@Controller('api/client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private readonly logger: DndMappLoggerService
    ) {
        this.logger.setContext(ClientController.name);
    }

    @Post()
    async register(@Query() queryParams: RegisterQueryParamsDto) {
        const { state } = queryParams;

        return {
            clientId: (await this.clientService.register()).id,
            state: state,
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) idParam: string) {
        await this.clientService.remove(idParam);
    }
}
