import { Injectable } from '@angular/core';
import { DmaTheme, dmaThemes } from '../../models';

@Injectable()
export class DmaThemeService {
    theme: DmaTheme;

    initializeTheme(): string {
        const themeStyling = dmaThemes.get(this.theme);
        let styling = '';

        Object.entries(themeStyling).forEach(([key, value]) => (styling += `${key}: ${value} `));

        return styling;
    }
}
