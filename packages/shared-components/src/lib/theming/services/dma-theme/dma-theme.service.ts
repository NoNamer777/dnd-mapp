import { Injectable } from '@angular/core';
import { DmaTheme, dmaThemes } from '../../models';

@Injectable()
export class DmaThemeService {
    theme: DmaTheme;

    initializeTheme(documentElement: HTMLElement) {
        const themeStyling = dmaThemes.get(this.theme);
        let styling = '';

        Object.entries(themeStyling).forEach(([key, value]) => (styling += `${key}: ${value} `));

        documentElement.setAttribute('style', styling);
    }
}
