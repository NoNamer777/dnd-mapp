export const HttpResponseStatusCodes = {
    // Successful responses
    OK: 200,
    CREATED: 201,
    // Client Error Responses
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    PAYLOAD_TOO_LARGE: 413,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUESTS: 429,
    // Server Error Responses
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
} as const;

export type HttpResponseStatusCode = (typeof HttpResponseStatusCodes)[keyof typeof HttpResponseStatusCodes];

export const HttpResponseStatusTexts = {
    // Successful responses
    OK: 'OK',
    CREATED: 'Created',
    // Client Error Responses
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    METHOD_NOT_ALLOWED: 'Method Not Allowed',
    REQUEST_TIMEOUT: 'Request Timeout',
    CONFLICT: 'Conflict',
    PAYLOAD_TOO_LARGE: 'Payload Too Large',
    UNSUPPORTED_MEDIA_TYPE: 'Unsupported Media Type',
    TOO_MANY_REQUESTS: 'Too Many Requests',
    // Server Error Responses
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    NOT_IMPLEMENTED: 'Not Implemented',
} as const;

export type HttpResponseStatusText = (typeof HttpResponseStatusTexts)[keyof typeof HttpResponseStatusTexts];

export function statusTextForCode(code: HttpResponseStatusCode | number) {
    const key = Object.entries(HttpResponseStatusCodes)
        .filter(([_, responseCode]) => responseCode === code)
        .map(([key, _]) => key)[0];

    return HttpResponseStatusTexts[key as keyof typeof HttpResponseStatusTexts];
}

export class BackEndError {
    status: number;
    message: string;
    timestamp: Date;
}
