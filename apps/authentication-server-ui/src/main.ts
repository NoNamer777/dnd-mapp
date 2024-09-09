import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, RootComponent } from './app/core';

async function main() {
    try {
        await bootstrapApplication(RootComponent, appConfig);
    } catch (error) {
        console.error(error);
    }
}

main();
