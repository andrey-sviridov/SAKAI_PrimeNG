import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize, delay } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const loader = inject(LoadingService);

    loader.show();

    return next(req).pipe(
        delay(300), // Минимальная задержка для предотвращения мигания
        finalize(() => {
            loader.hide();
        })
    );
};
