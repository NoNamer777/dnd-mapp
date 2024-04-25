import { animate, style, transition, trigger } from '@angular/animations';

export const appearAnimation = trigger('appear', [
    transition(':enter', [style({ opacity: 0 }), animate('350ms', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('700ms', style({ opacity: 0 }))]),
]);
