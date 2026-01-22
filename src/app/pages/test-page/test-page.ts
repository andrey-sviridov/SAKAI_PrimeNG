import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@/core/services/api.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { SimpleTable, TableColumn } from '@/components/simple-table/simple-table';
import { TableTemplateDirective } from '@/core/directives/TableTemplateDirective';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

@Component({
    selector: 'app-test-page',
    imports: [
        TableModule,
        Button,
        SimpleTable,
        TableTemplateDirective,
        DatePipe,
        TranslateModule
    ],
    templateUrl: './test-page.html',
    standalone: true,
    styleUrl: './test-page.scss'
})
export class TestPage {
    private api = inject(ApiService);
    public posts: any = [];
    public cols: TableColumn[] = [
        { columnName: 'TEST_PAGE.TABLE.ID', propName: 'id', style: 'width: auto;' },
        { columnName: 'TEST_PAGE.TABLE.ANIMAL', propName: 'nationalNumber', style: 'width: auto;' },
        { columnName: 'TEST_PAGE.TABLE.GENDER', propName: 'sex', style: 'width: auto;' },
        { columnName: 'TEST_PAGE.TABLE.OWNER', propName: 'organizationName', style: 'width: auto;' },
        { columnName: 'TEST_PAGE.TABLE.BIRTH_DATE', propName: 'birthDate', style: 'width: auto;' },
        { columnName: 'TEST_PAGE.TABLE.BREED', propName: 'breed', style: '' }
    ];
    users = [
        { id: 1, nationalNumber: 'KZ123456780009', ownerXin: 'KZ123456780009', organizationName: 'ТОО "Агро-Инвест"', sex: false, breed: 'Абердин Ангус', birthDate: '2020-05-12T00:00:00' },
        { id: 2, nationalNumber: 'KZ123456780002', ownerXin: 'KZ123456780009', organizationName: 'ТОО "Агро-Инвест"', sex: false, breed: 'Белоголовая', birthDate: '2023-02-20T00:00:00' },
        { id: 3, nationalNumber: 'KZ123456780003', ownerXin: 'KZ123456780009', organizationName: 'АО "КазМяс"', sex: false, breed: 'Абердин Ангус', birthDate: '2019-06-30T00:00:00' },
        { id: 4, nationalNumber: 'KZ123456780004', ownerXin: 'KZ123456780009', organizationName: 'ТОО "Молочный мир"', sex: false, breed: 'Голштинская', birthDate: '2018-09-15T00:00:00' },
        { id: 5, nationalNumber: 'KZ123456780007', ownerXin: '950101000111', organizationName: 'ИП "Алиев"', sex: false, breed: 'Абердин Ангус', birthDate: '2023-08-01T00:00:00' }
    ];
    loadData () {
       this.api.get('/posts').subscribe(res => this.posts = res);

    }

    protected readonly Date = Date;
    protected readonly moment = moment;
}
