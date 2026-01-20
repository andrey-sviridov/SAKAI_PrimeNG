import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from '@/core/services/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ProgressSpinnerModule, ToastModule], // Добавили ToastModule
    providers: [MessageService], // Регистрируем сервис сообщений здесь
    template: `
        <p-toast />
        <router-outlet></router-outlet>

        @if (loader.isLoading()) {
            <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20  animate-fade-in">
                <p-progressSpinner strokeWidth="4" />
            </div>
        }
    `,
    styles: `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .animate-fade-in {
            animation: fadeIn 0.2s ease-out forwards;
        }
    `
})
export class AppComponent {
    // Внедряем сервис, чтобы шаблон "слышал" изменение состояния загрузки
    public loader = inject(LoadingService);
}
