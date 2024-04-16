import { SessionBuilder } from '@dnd-mapp/data';
import { mockSessionDB } from '@dnd-mapp/data/testing';
import { http, HttpResponse } from 'msw';
import { PathParams } from 'msw/lib/core/utils/matching/matchRequestUrl';
import { environment } from '../../../../../../src/environments';
import { errorResponse } from '../error';

const basePath = environment.baseBackEndURL + '/session';

export const sessionHandlers = [
    http.post<PathParams, { state: string }>(basePath, async ({ request }) => {
        const { state } = await request.json();
        const { id } = mockSessionDB.save(new SessionBuilder().withId().build());

        return HttpResponse.json({ id: id, state: state });
    }),

    http.post<PathParams, { state: string }>(basePath + '/:sessionId', async ({ request, params }) => {
        const { state } = await request.json();
        const idParam = params['sessionId'] as string;

        const byId = mockSessionDB.findOneById(idParam);

        if (!byId) {
            throw errorResponse(404, 'Not Found', `Couldn't find Session: '${idParam}'`);
        }
        return HttpResponse.json({ state: state, id: byId.id });
    }),

    http.delete(basePath + '/:sessionId', ({ params }) => {
        const idParam = params['sessionId'] as string;

        try {
            mockSessionDB.deleteById(idParam);

            return HttpResponse.json(null);
        } catch (error) {
            throw errorResponse(404, 'Not Found', `Couldn't remove Session: '${idParam}' because it does not exist`);
        }
    }),
];
