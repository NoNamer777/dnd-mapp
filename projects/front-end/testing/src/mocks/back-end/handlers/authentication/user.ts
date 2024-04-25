import { UserModel } from '@dnd-mapp/data';
import { mockUserDB } from '@dnd-mapp/data/testing';
import { http, HttpResponse } from 'msw';
import { PathParams } from 'msw/lib/core/utils/matching/matchRequestUrl';
import { baseBackEndURL } from '../../constants';
import { errorResponse } from '../error';

const baseUrl = `${baseBackEndURL}/api/user`;

const userSanitizer = ({ id, username, roles }: UserModel) => ({
    id: id,
    username: username,
    roles: roles,
});

export const userHandler = [
    http.get(baseUrl, () => HttpResponse.json(mockUserDB.findAll().map(userSanitizer))),

    http.post<PathParams, UserModel>(baseUrl, async ({ request }) => {
        const data = await request.json();

        const byUsername = mockUserDB.findOneByUsername(data.username);

        if (byUsername) {
            throw errorResponse(400, 'Bad Request', `Username '${data.username} 'is not available`);
        }
        const created = userSanitizer(mockUserDB.create(data));
        return HttpResponse.json(created, { headers: { location: `${baseBackEndURL}/api/user/${created.id}` } });
    }),

    http.get<PathParams, UserModel>(baseUrl + '/:userId', ({ params }) => {
        const userId = params['userId'] as string;
        const byId = mockUserDB.findOneById(userId);

        if (!byId) {
            throw errorResponse(404, 'Not Found', `User with ID: '${userId}' was not found`);
        }
        return HttpResponse.json(userSanitizer(byId));
    }),

    http.delete(baseUrl + '/:userId', ({ params }) => {
        const userId = params['userId'] as string;

        try {
            mockUserDB.remove(userId);
        } catch (error) {
            throw errorResponse(404, 'Not Found', (error as Error).message);
        }
        return HttpResponse.json(null);
    }),

    http.put<PathParams, UserModel>(baseUrl + '/:userId', async ({ params, request }) => {
        const userId = params['userId'] as string;
        const byId = mockUserDB.findOneById(userId);

        const data = await request.json();

        if (!byId) {
            throw errorResponse(404, 'Not Found', `User with ID: '${userId}' was not found`);
        }
        const byUsername = mockUserDB.findOneByUsername(data.username);

        if (byUsername) {
            throw errorResponse(400, 'Bad Request', `Username '${data.username} 'is not available`);
        }

        try {
            return HttpResponse.json(mockUserDB.update(data));
        } catch (error) {
            throw errorResponse(404, 'Not Found', (error as Error).message);
        }
    }),
];
