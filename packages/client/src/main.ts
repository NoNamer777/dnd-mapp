import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/core';

(async () => {
    try {
        await platformBrowserDynamic().bootstrapModule(AppModule);
    } catch (error) {
        console.error(error);
    }
})();
