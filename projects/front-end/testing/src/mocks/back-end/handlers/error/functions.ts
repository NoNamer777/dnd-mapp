import { HttpResponse } from 'msw';

enum HttpResponseStatusCodes {
    // Successful responses
    OK = 200,
    CREATED = 201,
    // Client Error Responses
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    PAYLOAD_TOO_LARGE = 413,
    UNSUPPORTED_MEDIA_TYPE = 415,
    TOO_MANY_REQUESTS = 429,
    // Server Error Responses
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
}

type HttpResponseStatusCode = (typeof HttpResponseStatusCodes)[keyof typeof HttpResponseStatusCodes];

enum HttpResponseStatusTexts {
    // Successful responses
    OK = 'OK',
    CREATED = 'Created',
    // Client Error Responses
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    METHOD_NOT_ALLOWED = 'Method Not Allowed',
    REQUEST_TIMEOUT = 'Request Timeout',
    CONFLICT = 'Conflict',
    PAYLOAD_TOO_LARGE = 'Payload Too Large',
    UNSUPPORTED_MEDIA_TYPE = 'Unsupported Media Type',
    TOO_MANY_REQUESTS = 'Too Many Requests',
    // Server Error Responses
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    NOT_IMPLEMENTED = 'Not Implemented',
}

type HttpResponseStatusText = (typeof HttpResponseStatusTexts)[keyof typeof HttpResponseStatusTexts];

export function errorResponse(code: HttpResponseStatusCode, error: HttpResponseStatusText | string, message: string) {
    return HttpResponse.json(
        { statusCode: code, error: error, message: message, timestamp: Date.now() },
        { status: code, statusText: error }
    );
}

export function isPathParamValidId(param: string) {
    if (!Number.isNaN(Number(param)) && Number.isInteger(Number(param)) && Number(param) > 0) return;
    throw errorResponse(400, 'Bad Request', 'Invalid path parameter. Expected a positive integer');
}
