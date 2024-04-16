import { authenticationHandlers, sessionHandlers, userHandler } from './authentication';

export const handlers = [...userHandler, ...authenticationHandlers, ...sessionHandlers];
