import { trigger, state, animate, transition, style } from '@angular/animations';


function firstAnimation(timing: number, enterAni: string, leaveAni: string){

    let animation =

        trigger('ani1', [

            transition(':enter', [

                style({
                    transform: enterAni,
                    opacity: 0}),
                  animate(timing)
            ]),

            transition(':leave', [

                   //style({transform: 'translateX(0%)', opacity:1}),
                  animate(timing, style({ opacity: 0}))
            ])
        ]); 

    return animation;
}


function secondAnimation(time: string, initOpacity: number, finalOpaciti: number){

    let animation = 

        trigger('ani2', [

            // route 'enter' transition
            transition(':enter', [
                // styles at start of transition
                style({ opacity: initOpacity }),
                // animation and styles at end of transition
                animate(time, style({ opacity: finalOpaciti }))
            ]),
    ]);

    return animation;

}

export { firstAnimation };
export { secondAnimation };

export  const ANI = [
    firstAnimation,
    secondAnimation
]

    