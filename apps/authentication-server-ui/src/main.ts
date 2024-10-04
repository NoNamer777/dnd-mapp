import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, RootComponent } from './app/core';

async function main() {
    try {
        if (isDevMode()) {
            const { startServer } = await import('@dnd-mapp/authentication-server-ui/testing');
            await startServer();
        }
        await bootstrapApplication(RootComponent, appConfig);
    } catch (error) {
        console.error(error);
    }
}

main();
