import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { TranslationService } from './services/translation.service';

const initializeTranslations = (translationService: TranslationService) => () => translationService.initialize();

export const provideTranslations: () => FactoryProvider = () => ({
    provide: APP_INITIALIZER,
    deps: [TranslationService],
    useFactory: initializeTranslations,
    multi: true,
});
