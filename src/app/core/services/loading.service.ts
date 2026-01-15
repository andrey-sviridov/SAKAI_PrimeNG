import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    // Используем Signals — это стандарт Angular 20
    readonly isLoading = signal(false);

    show() { this.isLoading.set(true); }
    hide() { this.isLoading.set(false); }
}
