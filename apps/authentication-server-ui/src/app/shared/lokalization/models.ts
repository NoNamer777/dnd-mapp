const Locales = {
    enUS: 'en-US',
    nlNL: 'nl-NL',
} as const;

export type Locale = (typeof Locales)[keyof typeof Locales];

export const defaultLocale: Locale = 'en-US';

export type Translations = Record<string, string>;
