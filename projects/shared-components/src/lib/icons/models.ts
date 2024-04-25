export enum DmaIcons {
    ARROW_RIGHT_FROM_BRACKET = 'arrow-right-from-bracket',
    BARS = 'bars',
    BOOK = 'book',
    CARET_DOWN = 'caret-down',
    CARET_UP = 'caret-up',
    CIRCLE_EXCLAMATION = 'circle-exclamation',
    CIRCLE_XMARK = 'circle-xmark',
    ENVELOPE = 'envelope',
    LOCK = 'lock',
    MAGNIFYING_GLASS = 'magnifying-glass',
    MICROPHONE = 'microphone',
    PLUS = 'plus',
    SPINNER = 'spinner',
    STAR = 'star',
    USER = 'user',
    USERS = 'users',
    WAND_SPARKLES = 'wand-sparkles',
}

export enum DmaIconTypes {
    SOLID = 'solid',
    REGULAR = 'regular',
}

export type DmaIconName = (typeof DmaIcons)[keyof typeof DmaIcons];

export function dmaIconNameAttribute(input: string | DmaIconName) {
    return Object.values(DmaIcons as unknown as string[]).includes(input) ? (input as DmaIconName) : undefined;
}

export type DmaIconType = (typeof DmaIconTypes)[keyof typeof DmaIconTypes];

export function dmaIconTypeAttribute(input: string | DmaIconType) {
    return Object.values(DmaIconTypes as unknown as string[]).includes(input) ? (input as DmaIconType) : undefined;
}
