export enum DmaIcons {
    BARS = 'bars',
    BOOK = 'book',
    PLUS = 'plus',
    STAR = 'star',
    USERS = 'users',
    WAND_SPARKLES = 'wand-sparkles',
    MAGNIFYING_GLASS = 'magnifying-glass',
}

export enum DmaIconTypes {
    SOLID = 'solid',
    REGULAR = 'regular',
}

export type DmaIconName = (typeof DmaIcons)[keyof typeof DmaIcons];

export type DmaIconType = (typeof DmaIconTypes)[keyof typeof DmaIconTypes];
