import { trigger, state, animate, transition, style } from '@angular/animations';

export const loginState =
    trigger('loginState', [
        // route 'enter' transition
        transition(':enter', [

            /*// styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('1s', style({ opacity: 1 }))*/
            style({transform: 'translateX(-100%)'}),
      		animate(800)
        ]),

        transition(':leave', [
      		animate(100, style({transform: 'translateX(100%)'}))
    ])
    ]);

export const uploadState =
    trigger('uploadState', [
        // route 'enter' transition
        transition(':enter', [

            /*// styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('1s', style({ opacity: 1 }))*/
            style({transform: 'translateX(-100%)'}),
      		animate(800)
        ]),

        transition(':leave', [
      		animate(100, style({transform: 'translateX(100%)'}))
    ])
    ]);