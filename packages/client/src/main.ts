import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@popperjs/core/dist/esm/popper.js';
import 'bootstrap/dist/js/bootstrap.esm.min.js';

import { AppModule } from './app/core';

(async () => {
    try {
        await platformBrowserDynamic().bootstrapModule(AppModule);
    } catch (error) {
        console.error(error);
    }
})();
