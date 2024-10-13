import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, RootComponent } from './app/core';

async function main() {
    try {
        if (isDevMode()) {
            const { startServer, withDefaultServerState } = await import('@dnd-mapp/authentication-server-ui/testing');
            withDefaultServerState();

            await startServer();
        }
        await bootstrapApplication(RootComponent, appConfig);
    } catch (error) {
        console.error(error);
    }
}

main();
