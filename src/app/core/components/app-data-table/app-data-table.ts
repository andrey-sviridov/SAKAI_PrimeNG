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

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
