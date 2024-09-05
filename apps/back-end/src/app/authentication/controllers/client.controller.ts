import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LoggerService } from '../../common';
import { ClientIdResponse, StateRequest } from '../models';
import { ClientService } from '../services';

@Controller('api/client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(ClientController.name);
    }

    @Post()
    async create(@Body() requestBody: StateRequest): Promise<ClientIdResponse> {
        this.logger.log('Received request to create a new Client configuration');
        const { state } = requestBody;

        return {
            id: (await this.clientService.create()).id,
            state: state,
        };
    }

    @Post(':id')
    async findById(@Param('id') idParam: string, @Body() requestBody: StateRequest): Promise<ClientIdResponse> {
        this.logger.log(`Received request to find Client configuration by ID: '${idParam}'`);
        const { state } = requestBody;

        return {
            state: state,
            id: (await this.clientService.findById(idParam)).id,
        };
    }

    @Delete(':id')
    async remove(@Param('id') idParam: string) {
        this.logger.log(`Received request to remove Client configuration with ID: '${idParam}'`);
        await this.clientService.remove(idParam);
    }
}
