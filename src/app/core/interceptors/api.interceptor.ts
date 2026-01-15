import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize, forkJoin, timer, of, concatMap } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const loader = inject(LoadingService);

    let isRequestActive = true;

    // 1. Умная задержка ПОЯВЛЕНИЯ
    setTimeout(() => {
        if (isRequestActive) {
            loader.show();
        }
    }, 500); // Если запрос дольше 400мс — включаем маску

    return next(req).pipe(
        // 2. Гарантируем, что маска не исчезнет слишком быстро (минимум 600мс)
        // Это предотвращает "моргание"
        concatMap(event => {
            // Если маска УЖЕ показана, подождем немного перед тем как отдавать данные
            // Если не показана — отдаем сразу
            return forkJoin([of(event), timer(600)]).pipe(concatMap(([e]) => of(e)));
        }),
        finalize(() => {
            isRequestActive = false;
            loader.hide();
        })
    );
};
