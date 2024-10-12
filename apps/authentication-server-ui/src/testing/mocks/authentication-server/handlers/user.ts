import { delay, http } from 'msw';
import { mockUserDB } from '../../db';

export const userHandlers = [
    http.get('https://localhost.dndmapp.net:8080/authentication/users', async () => {
        await delay();
        return Response.json(mockUserDB.getAll());
    }),
];
