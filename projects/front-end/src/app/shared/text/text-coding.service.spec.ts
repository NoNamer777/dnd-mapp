import { TestBed } from '@angular/core/testing';
import { TextCodingService } from './text-coding.service';

describe('TextCodingService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            providers: [TextCodingService],
        });

        return {
            service: TestBed.inject(TextCodingService),
        };
    }

    it('Should encode text', () => {
        const { service } = setupTestEnvironment();
        const buffer = new TextEncoder().encode('test');

        expect(service.encode('test')).toEqual(buffer);
    });

    it('Should decode text', () => {
        const { service } = setupTestEnvironment();
        const buffer = new TextEncoder().encode('test');
        const value = btoa(String.fromCodePoint(...buffer));

        expect(service.base64(buffer)).toEqual(value);
    });
});
