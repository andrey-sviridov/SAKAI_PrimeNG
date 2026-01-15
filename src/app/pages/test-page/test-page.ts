import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@/core/services/api.service';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { SimpleTable, TableColumn } from '@/components/simple-table/simple-table';
import { TableTemplateDirective } from '@/core/directives/TableTemplateDirective';
import { DatePipe, UpperCasePipe } from '@angular/common';
// Если нужна русская локализация
import 'moment/locale/ru';
import moment from 'moment';

@Component({
    selector: 'app-test-page',
    imports: [
        TableModule,
        Button,
        SimpleTable,
        ButtonDirective,
        TableTemplateDirective,
        DatePipe,
        UpperCasePipe
    ],
    templateUrl: './test-page.html',
    standalone: true,
    styleUrl: './test-page.scss'
})
export class TestPage {
    private api = inject(ApiService);
    public posts: any = [];

    cols: TableColumn[] = [
        { columnName: 'Айдишник', propName: 'id', style: 'width: auto;' },
        { columnName: 'Имя', propName: 'name', style: 'font-weight: bold;' },
        { columnName: 'Возраст', propName: 'birthDate' } // Тут будет кастомный темплейт
    ];
    users = [
        { id: 1, name: 'Lol', birthDate: '1994-02-19T00:00:00' },
        { id: 2, name: 'Kek', birthDate: '1994-04-29T00:00:00' }
    ];
    loadData () { // Используйте = () =>
       this.api.get('/posts').subscribe(res => this.posts = res);

    }

    protected readonly Date = Date;
    protected readonly moment = moment;
}
