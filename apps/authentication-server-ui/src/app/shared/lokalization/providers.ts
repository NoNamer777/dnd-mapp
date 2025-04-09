import { inject, provideAppInitializer } from '@angular/core';
import { TranslationService } from './services/translation.service';

export const provideTranslations = () =>
    provideAppInitializer(() => {
        const translationsService = inject(TranslationService);
        return translationsService.initialize();
    });
