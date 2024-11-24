import { delay, http, HttpResponse } from 'msw';
import { mockUserDB } from '../../db';

export const userHandlers = [
    http.get('https://localhost.dndmapp.net:8080/authentication/users', async () => {
        await delay();
        return HttpResponse.json(mockUserDB.getAll());
    }),
    http.delete<{ userId: string }>(
        'https://localhost.dndmapp.net:8080/authentication/users/:userId',
        async ({ params }) => {
            const { userId } = params;

            mockUserDB.remove(userId);

            await delay();
            return new HttpResponse(null, { status: 200 });
        }
    ),
];
