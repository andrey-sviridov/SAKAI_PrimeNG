import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { TableTemplateDirective } from '@/core/directives/TableTemplateDirective';
import { TableModule } from 'primeng/table';
import { NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-simple-table',
    imports: [
        TableModule,
        NgTemplateOutlet,
        TranslateModule
    ],
    templateUrl: './simple-table.html',
    standalone: true,
    styleUrl: './simple-table.scss'
})
export class SimpleTable implements AfterContentInit {
    @Input() data: any[] = [];
    @Input() columns: TableColumn[] = [];
    @Input() loading: boolean = false;

    // Получаем список всех переданных шаблонов
    @ContentChildren(TableTemplateDirective) templates!: QueryList<TableTemplateDirective>;

    templateMap: { [key: string]: TemplateRef<any> } = {};

    ngAfterContentInit() {
        // Создаем карту шаблонов для быстрого доступа: 'propName' -> TemplateRef
        this.templates.forEach(item => {
            this.templateMap[item.name] = item.template;
        });
    }

    // Хелпер для получения шаблона по имени поля
    getTemplate(propName: string): TemplateRef<any> | null {
        return this.templateMap[propName] || null;
    }
}
export interface TableColumn {
    header: string; // Заголовок
    field: string;   // Ключ в объекте данных
    style?: string;     // CSS стили (ширина, цвет)
    styleClass?: string; // CSS классы
}
