import { Inject, Injectable, InjectionToken } from '@angular/core';

const TEXT_ENCODER = new InjectionToken('Text encoder', {
    providedIn: 'root',
    factory: () => new TextEncoder(),
});

@Injectable({ providedIn: 'root' })
export class TextCodingService {
    constructor(@Inject(TEXT_ENCODER) private readonly textEncoder: TextEncoder) {}

    /** Encodes a String value into a binary data buffer representation */
    encode(value: string) {
        return this.textEncoder.encode(value);
    }

    base64(data: Uint8Array | ArrayBuffer) {
        const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;

        return btoa(String.fromCodePoint(...buffer));
    }
}
