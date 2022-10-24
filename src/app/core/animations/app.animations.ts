import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  transition('* <=> *', [
    query(':enter, :leave',
      style({ position: 'fixed', height: '0px', zIndex: 2 }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)', zIndex: 10, opacity: 1 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)',  opacity: 0  })),
      ], { optional: true }),
    ]),
  ]),
]);
