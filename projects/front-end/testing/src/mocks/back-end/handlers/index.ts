import { HttpResponse, http } from 'msw';
import configFile from '../../../../../src/assets/config/config.json';
import { authenticationHandlers, sessionHandlers, userHandler } from './authentication';

export const handlers = [
    http.get('assets/config/config.json', async () => HttpResponse.json(configFile)),
    ...userHandler,
    ...authenticationHandlers,
    ...sessionHandlers,
];
