import { SetupWorker, setupWorker } from 'msw/browser';
import { UnhandledRequestPrint } from 'msw/lib/core/utils/request/onUnhandledRequest';
import { withDefaultUsers } from '../db';
import { authenticationServerHandlers } from './handlers';

let server: SetupWorker;

function onUnhandledRequest(request: Request, print: UnhandledRequestPrint) {
    if (!request.url.startsWith('https://localhost.dndmapp.net:8080/authentication')) return;
    print.error();
}

export async function startServer() {
    server = setupWorker(...authenticationServerHandlers);

    await server.start({
        onUnhandledRequest: onUnhandledRequest,
        quiet: true,
    });
}

export function withDefaultServerState() {
    withDefaultUsers();
}

export function resetListeners() {
    server.resetHandlers();
}

export function stopServer() {
    server.stop();
}

export function getMsw() {
    return server;
}
