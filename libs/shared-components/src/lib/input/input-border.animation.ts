import { animate, state, style, transition, trigger } from '@angular/animations';

export const inputBorderAnimation = trigger('inputBorder', [
    state('unpopulated', style({ transform: 'scaleX(0)' })),
    state('populated', style({ transform: 'scaleX(1)' })),
    transition('unpopulated => populated', animate('80ms ease-in-out')),
    transition('populated => unpopulated', animate('200ms ease-in-out')),
]);
