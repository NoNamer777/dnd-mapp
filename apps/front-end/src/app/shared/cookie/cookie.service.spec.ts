import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            providers: [CookieService],
        });

        return {
            service: TestBed.inject(CookieService),
        };
    }

    it('should read the value of a cookie', () => {
        spyOnProperty(document, 'cookie').and.returnValue('cookie1-name=value1; cookie2-name=value2');

        const { service } = setupTestEnvironment();

        expect(service.getCookie('cookie1-name')).toEqual('value1');
        expect(service.getCookie('cookie2-name')).toEqual('value2');
        expect(service.getCookie('cookie3-name')).toBeUndefined();
    });
});
