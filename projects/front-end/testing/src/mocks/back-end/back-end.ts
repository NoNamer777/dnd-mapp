import { resetDatabases } from '@dnd-mapp/data/testing';
import { setupWorker, SetupWorker } from 'msw/browser';
import { handlers } from './handlers';

let worker: SetupWorker;

export const getMockServiceWorker = () => worker;

export function setupMockServiceWorker() {
    worker = setupWorker(...handlers);

    return {
        startWorker: async () =>
            await worker.start({
                quiet: true,
                waitUntilReady: false,
                onUnhandledRequest: (request, print) => {
                    if (['icons', 'fonts.gstatic.com'].find((urlPart) => request.url.includes(urlPart))) return;
                    print.warning();
                },
            }),
        stopWorker: () => worker.stop(),
        resetWorker: async () => {
            worker.resetHandlers();
            resetDatabases();
        },
    };
}
