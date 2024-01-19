import '@popperjs/core/dist/esm/popper.js';
import 'bootstrap/dist/js/bootstrap.esm.min.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, DmaRootComponent } from './app/core';

(async () => {
    try {
        await bootstrapApplication(DmaRootComponent, appConfig);
    } catch (error) {
        console.error(error);
    }
})();
