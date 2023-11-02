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
        return {
            url: `${buildServerUrl(this.configService)}/app`,
        };
    }
}
