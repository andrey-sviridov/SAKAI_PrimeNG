import { trigger, transition, style, query, animate } from '@angular/animations';

export const slideLeftRightAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            // 1. Базовая настройка: чтобы страницы накладывались, но не прыгали
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 1 // По умолчанию всё видимо
                })
            ], { optional: true }),

            // 2. Сразу скрываем новую страницу (она будет ждать своей очереди)
            query(':enter', [
                style({transform: 'translateX(-1%)', opacity: 0 })
            ], { optional: true }),

            // 3. ШАГ 1: Старая страница исчезает (200мс)
            query(':leave', [
                animate('200ms ease-out', style({transform: 'translateX(1%)', opacity: 0 }))
            ], { optional: true }),

            // 4. ШАГ 2: Новая страница появляется (200мс)
            query(':enter', [
                animate('200ms ease-in', style({transform: 'translateX(0%)',  opacity: 1 }))
            ], { optional: true }),
        ])
    ]);
