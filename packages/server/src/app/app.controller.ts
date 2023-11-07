import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { buildServerUrl } from './common';

@Controller({
    path: '',
})
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get('')
    @Redirect('app', 301)
    getRoot() {
        const { host, port, address, useSsl } = this.configService.get('server');
        return {
            url: `${buildServerUrl(host, port, useSsl, address)}/app`,
        };
    }
}
