import { http } from 'msw';

export const userHandlers = [
    http.get('https://localhost.dndmapp.net:8080/authentication/users', () => Response.json([])),
];
