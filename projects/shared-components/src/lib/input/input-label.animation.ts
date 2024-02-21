import { animate, state, style, transition, trigger } from '@angular/animations';

export const inputLabelAnimation = trigger('inputLabel', [
    state(
        'unpopulated',
        style({
            left: '1rem',
            top: '0.6rem',
        })
    ),
    state(
        'populated',
        style({
            left: '1.6rem',
            top: '-0.75rem',
            transform: 'scale(0.9) translateX(-1em)',
        })
    ),
    transition('unpopulated => populated', [animate('100ms ease-in-out')]),
    transition('populated => unpopulated', [animate('150ms ease-in-out')]),
]);
