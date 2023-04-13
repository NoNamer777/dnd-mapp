import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/core';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
