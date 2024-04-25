import { HttpResponseStatusCode, HttpResponseStatusText } from '@dnd-mapp/data';
import { HttpResponse } from 'msw';

export function errorResponse(code: HttpResponseStatusCode, error: HttpResponseStatusText | string, message: string) {
    return HttpResponse.json(
        { statusCode: code, error: error, message: message, timestamp: Date.now() },
        { status: code, statusText: error }
    );
}
