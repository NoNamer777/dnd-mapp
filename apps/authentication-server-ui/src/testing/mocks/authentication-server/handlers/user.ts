import { User } from '@dnd-mapp/data';
import { delay, http, HttpResponse } from 'msw';
import { mockUserDB } from '../../db';

export const userHandlers = [
    http.get('https://localhost.dndmapp.net:8080/authentication/users', async () => {
        await delay();
        const users = mockUserDB.getAll().sort((curr, next) => sortUser(curr, next));

        return HttpResponse.json(users);
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

function sortUser(curr: User, next: User) {
    if (!containsNumber(curr.username) || !containsNumber(curr.username))
        return curr.username.localeCompare(next.username);

    const [currUsername, currNumber] = extractNumber(curr.username) as [string, number];
    const [nextUsername, nextNumber] = extractNumber(next.username) as [string, number];

    if (currUsername.localeCompare(nextUsername) === 0) {
        return currNumber - nextNumber;
    }
    return currUsername.localeCompare(nextUsername);
}

function extractNumber(value: string) {
    return value.split(' ').map((text) => {
        if (Number.isNaN(Number(text))) return text;
        else return Number(text);
    });
}

function containsNumber(value: string) {
    return Boolean(value.match(/\d+/gi));
}
