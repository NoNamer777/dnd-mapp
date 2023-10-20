import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const swipeInOutAnimation = trigger('swipe', [
    transition('1 => 2', [
        style({ position: 'relative' }),
        query(':enter, :leave', [style({ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 })]),
        query(':enter', [style({ left: '100%' })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('200ms ease-out', style({ left: '-100%', opacity: 0 }))]),
            query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
        ]),
    ]),
    transition('2 => 1', [
        style({ position: 'relative' }),
        query(':enter, :leave', [style({ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 })]),
        query(':enter', [style({ left: '-100%' })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('200ms ease-out', style({ left: '100%', opacity: 0 }))]),
            query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
        ]),
    ]),
]);
