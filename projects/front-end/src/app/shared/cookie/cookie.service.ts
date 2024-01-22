import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookieService {
    getCookie(name: string) {
        return this.getCookies()[name];
    }

    private getCookies() {
        const cookiesString = document.cookie.split('; ');

        const cookies: Record<string, string> = {};

        for (const cookieString of cookiesString) {
            const value = cookieString.split('=');

            cookies[value[0]] = value[1];
        }
        return cookies;
    }
}
