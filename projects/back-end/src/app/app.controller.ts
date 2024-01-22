import { Controller, Get, Redirect } from '@nestjs/common';
import { backEndServerAddress } from './common';

@Controller({
    path: '',
})
export class AppController {
    @Get('')
    @Redirect('app', 301)
    getRoot() {
        return {
            url: `${backEndServerAddress}/app`,
        };
    }
}
