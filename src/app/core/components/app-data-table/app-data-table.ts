import { Component, Input, TemplateRef, ContentChildren, QueryList, AfterContentInit, OnInit, OnDestroy, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule, DatePipe, NgTemplateOutlet } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableTemplateDirective } from '@/core/directives/TableTemplateDirective';
import { TranslateModule } from '@ngx-translate/core';

interface ColumnTemplateContext {
    $implicit: any; // Это будет сама строка данных (rowData)
    field: string;
}
@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        NgTemplateOutlet,
        DatePipe,
        TranslateModule
    ],
    templateUrl: './app-data-table.html',
    styleUrls: ['./app-data-table.scss']
})
export class AppDataTable implements AfterContentInit, OnDestroy {
    private destroy$ = new Subject<void>();
    isDarkMode = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        // Подписываемся на изменения темы
        this.detectTheme();

        // Слушаем изменения темы
        const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
        if (themeLink) {
            const themeLinkObserver = new MutationObserver(() => {
                this.detectTheme();
            });
            themeLinkObserver.observe(themeLink, { attributes: true });
        }
    }
    @Input() data: any[] = [];
    @Input() columns: any[] = [];

    // PrimeNG настройки
    @Input() rows = 10;
    @Input() scrollable = false;
    @Input() scrollHeight = '400px';

    // Магия: ищем все шаблоны внутри тегов <app-data-table>
    @ContentChildren(TableTemplateDirective) templates!: QueryList<TableTemplateDirective>;


    // Сюда сложим шаблоны по именам: { 'organizationName': TemplateRef, ... }
    bodyTemplatesMap: { [key: string]: TemplateRef<any> } = {};

    ngAfterContentInit() {
        this.templates.forEach(item => {
            this.bodyTemplatesMap[item.name] = item.template;
        });
    }

    // Хелпер для получения шаблона
    getBodyTemplate(field: string): TemplateRef<any> | null {
        return this.bodyTemplatesMap[field] || null;
    }

    private detectTheme() {
        if (isPlatformBrowser(this.platformId)) {
            this.isDarkMode = document.body.classList.contains('dark-theme') ||
                             document.documentElement.getAttribute('data-theme') === 'dark';
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
