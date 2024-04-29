import { SessionBuilder } from '@dnd-mapp/data';
import { mockSessionDB } from '@dnd-mapp/data/testing';
import { http, HttpResponse } from 'msw';
import { PathParams } from 'msw/lib/core/utils/matching/matchRequestUrl';
import { baseBackEndURL } from '../../constants';
import { errorResponse } from '../error';

const basePath = `${baseBackEndURL}/session`;

export const sessionHandlers = [
    http.post<PathParams, { state: string }>(basePath, async ({ request }) => {
        const { state } = await request.json();
        const session = mockSessionDB.create(new SessionBuilder().build());

        return HttpResponse.json({ data: { ...session }, state: state });
    }),

    http.delete(basePath + '/:sessionId', ({ params }) => {
        const idParam = params['sessionId'] as string;

        try {
            mockSessionDB.remove(idParam);

            return HttpResponse.json(null);
        } catch (error) {
            throw errorResponse(404, 'Not Found', `Couldn't remove Session: '${idParam}' because it does not exist`);
        }
    }),
];
