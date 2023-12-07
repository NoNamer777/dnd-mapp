import { Controller, Delete, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DndMappLoggerService } from '../../common';
import { ClientService } from './client.service';
import { RegisterQueryParamsDto } from './models';

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
        const { id } = queryParams;

        return {
            clientId: (await this.clientService.register()).id,
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) idParam: string) {
        await this.clientService.remove(idParam);
    }
}
