import { http, HttpResponse } from 'msw';
import { baseBackEndURL } from '../../constants';

const baseUrl = `${baseBackEndURL}/authentication`;

export const authenticationHandlers = [
    http.post(`${baseUrl}/authorize`, () => HttpResponse.json({})),
    http.post(`${baseUrl}/challenge`, () => HttpResponse.json({})),
    http.post(`${baseUrl}/login`, () => HttpResponse.json({})),
    http.post(`${baseUrl}/sign-out`, () => HttpResponse.json({})),
    http.post(`${baseUrl}/sign-up`, () => HttpResponse.json({})),
    http.post(`${baseUrl}/token`, () => HttpResponse.json({})),
];
