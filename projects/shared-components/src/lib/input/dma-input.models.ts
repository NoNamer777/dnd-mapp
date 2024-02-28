import { ExistingProvider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DmaIconTypes } from '../icons';
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
    return Object.values(DmaIconTypes as unknown as string[]).includes(input) ? (input as DmaInputType) : undefined;
}

export type AnimationState = 'populated' | 'unpopulated';

export type AutoComplete =
    | 'off'
    | 'on'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'shipping'
    | 'billing'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
    | 'webauthn';
