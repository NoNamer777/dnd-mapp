import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { RequestService } from '../../http';
import { defaultLocale, Locale, Translations } from '../models';

const translationsBasePath = 'data/localization';

@Injectable({ providedIn: 'root' })
export class TranslationService {
    private readonly requestService = inject(RequestService);
    private readonly destroyRef = inject(DestroyRef);

    public readonly translations = signal<Translations>(null);
    public readonly locale = signal<Locale>(null);

    public initialize() {
        return this.retrieveTranslations(defaultLocale);
    }

    public updateLocale(locale: Locale) {
        return this.locale() === locale ? of(locale) : this.retrieveTranslations(locale);
    }

    public getTranslation(key: string) {
        const translation = (this.translations() ?? {})[key];

        if (!translation) {
            console.warn(`Missing translation for key "${key}"`);
            return key;
        }
        return translation;
    }

    private retrieveTranslations(locale: Locale) {
        const filePath = this.constructTranslationsFilePath(locale);

        return this.requestService.get<Translations>(filePath).pipe(
            takeUntilDestroyed(this.destroyRef),
            map((translations) => {
                this.translations.set(translations);
                this.locale.set(locale);
                return locale;
            })
        );
    }

    private constructTranslationsFilePath(locale: Locale) {
        return `${translationsBasePath}/${locale.toLowerCase()}.json`;
    }
}
