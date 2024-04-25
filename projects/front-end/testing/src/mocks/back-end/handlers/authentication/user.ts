import { UserModel } from '@dnd-mapp/data';
import { mockUserDB } from '@dnd-mapp/data/testing';
import { http, HttpResponse } from 'msw';
import { PathParams } from 'msw/lib/core/utils/matching/matchRequestUrl';
import { errorResponse, isPathParamValidId } from '../error';
import { baseBackEndURL } from '../../constants';

const baseUrl = `${baseBackEndURL}/api/user`;

export const userHandler = [
    http.get(baseUrl, () => HttpResponse.json(mockUserDB.findAll())),

    http.post<PathParams, UserModel>(baseUrl, async ({ request }) => {
        const data = await request.json();

        const byUsername = mockUserDB.findOneByUsername(data.username);

        if (byUsername) {
            throw errorResponse(400, 'Bad Request', `Username '${data.username} 'is not available`);
        }
        return HttpResponse.json(mockUserDB.save(data));
    }),

    http.get<PathParams, UserModel>(baseUrl + '/:userId', ({ params }) => {
        const userId = params['userId'] as string;

        isPathParamValidId(userId);

        const byId = mockUserDB.findOneById(Number(userId));

        if (!byId) {
            throw errorResponse(404, 'Not Found', `User with ID: '${userId}' was not found`);
        }
        return HttpResponse.json(byId);
    }),

    http.delete(baseUrl + '/:userId', ({ params }) => {
        const userId = params['userId'] as string;

        isPathParamValidId(userId);

        try {
            mockUserDB.deleteById(Number(userId));
        } catch (error) {
            throw errorResponse(404, 'Not Found', (error as Error).message);
        }
        return HttpResponse.json(null);
    }),

    http.put<PathParams, UserModel>(baseUrl + '/:userId', async ({ params, request }) => {
        const userId = params['userId'] as string;
        const data = await request.json();

        isPathParamValidId(userId);

        const byId = mockUserDB.findOneById(Number(userId));

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
