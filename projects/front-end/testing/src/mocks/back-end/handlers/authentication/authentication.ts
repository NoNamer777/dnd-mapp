import { http, HttpResponse } from 'msw';
import { environment } from '../../../../../../src/environments';

export const authenticationHandlers = [
    http.post(environment.baseBackEndURL + '/authentication/authorize', () => HttpResponse.json({})),
    http.post(environment.baseBackEndURL + '/authentication/challenge', () => HttpResponse.json({})),
    http.post(environment.baseBackEndURL + '/authentication/login', () => HttpResponse.json({})),
    http.post(environment.baseBackEndURL + '/authentication/sign-out', () => HttpResponse.json({})),
    http.post(environment.baseBackEndURL + '/authentication/sign-up', () => HttpResponse.json({})),
    http.post(environment.baseBackEndURL + '/authentication/token', () => HttpResponse.json({})),
];
