import { ExistingProvider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DmaInputComponent } from './dma-input.component';

export const dmaInputValueAccessorProvider: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DmaInputComponent),
    multi: true,
};

export enum DmaInputTypes {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    SEARCH = 'search',
    TELEPHONE = 'tel',
}

export type DmaInputType = (typeof DmaInputTypes)[keyof typeof DmaInputTypes];

export function dmaInputTypeAttribute(input: string | DmaInputType) {
    return Object.values(DmaInputTypes as unknown as string[]).includes(input) ? (input as DmaInputType) : undefined;
}

export type AnimationState = 'populated' | 'unpopulated';

export enum AutoCompleteValues {
    OFF = 'off',
    ON = 'on',
    NAME = 'name',
    HONORIFIC_PREFIX = 'honorific-prefix',
    GIVE_NAME = 'given-name',
    ADDITIONAL_NAME = 'additional-name',
    FAMILY_NAME = 'family-name',
    HONORIFIC_SUFFIX = 'honorific-suffix',
    NICKNAME = 'nickname',
    EMAIL = 'email',
    USERNAME = 'username',
    NEW_PASSWORD = 'new-password',
    CURRENT_PASSWORD = 'current-password',
    ONE_TIME_CODE = 'one-time-code',
    ORGANIZATION_TITLE = 'organization-title',
    ORGANIZATION = 'organization',
    STREET_ADDRESS = 'street-address',
    SHIPPING = 'shipping',
    BILLING = 'billing',
    ADDRESS_LINE1 = 'address-line1',
    ADDRESS_LINE2 = 'address-line2',
    ADDRESS_LINE3 = 'address-line3',
    ADDRESS_LINE_4 = 'address-level4',
    ADDRESS_LEVEL3 = 'address-level3',
    ADDRESS_LEVEL2 = 'address-level2',
    ADDRESS_LEVEL1 = 'address-level1',
    COUNTRY = 'country',
    COUNTRY_NAME = 'country-name',
    POSTAL_CODE = 'postal-code',
    CC_NAME = 'cc-name',
    CC_GIVEN_NAME = 'cc-given-name',
    CC_FAMILY_NAME = 'cc-family-name',
    CC_NUMBER = 'cc-number',
    CC_EXP = 'cc-exp',
    CC_EXP_MONTH = 'cc-exp-month',
    CC_EXP_YEAR = 'cc-exp-year',
    CC_CSC = 'cc-csc',
    CC_TYPE = 'cc-type',
    TRANSACTION_CURRENCY = 'transaction-currency',
    TRANSACTION_AMOUNT = 'transaction-amount',
    LANGUAGE = 'language',
    BDAY = 'bday',
    BDAY_DAY = 'bday-day',
    BDAY_MONTH = 'bday-month',
    BDAY_YEAR = 'bday-year',
    SEX = 'sex',
    TEL = 'tel',
    TEL_COUNTRY_CODE = 'tel-country-code',
    TEL_NATIONAL = 'tel-national',
    TEL_AREA_CODE = 'tel-area-code',
    TEL_LOCAL = 'tel-local',
    TEL_EXTENSION = 'tel-extension',
    IMPP = 'impp',
    URL = 'url',
    PHOTO = 'photo',
    WEBAUTHN = 'webauthn',
}

export type AutoComplete = (typeof AutoCompleteValues)[keyof typeof AutoCompleteValues];

export function dmaAutoCompleteAttribute(input: string | AutoComplete) {
    return Object.values(AutoCompleteValues as unknown as string[]).includes(input)
        ? (input as AutoComplete)
        : undefined;
}
