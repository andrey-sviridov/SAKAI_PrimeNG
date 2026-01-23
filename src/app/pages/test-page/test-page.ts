import { Component, inject } from '@angular/core';
import { ApiService } from '@/core/services/api.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { TableColumn } from '@/components/simple-table/simple-table';
import { TableTemplateDirective } from '@/core/directives/TableTemplateDirective';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { AppDataTable } from '@/core/components/app-data-table/app-data-table';

@Component({
    selector: 'app-test-page',
    imports: [
        TableModule,
        Button,
        TableTemplateDirective,
        DatePipe,
        TranslateModule,
        AppDataTable
    ],
    templateUrl: './test-page.html',
    standalone: true,
    styleUrl: './test-page.scss'
})
export class TestPage {
    private api = inject(ApiService);
    public posts: any = [];
    public cols: TableColumn[] = [
        { header: 'TEST_PAGE.TABLE.ID', field: 'id', style: 'width: auto;' },
        { header: 'TEST_PAGE.TABLE.ANIMAL', field: 'nationalNumber', style: 'width: auto;' },
        { header: 'TEST_PAGE.TABLE.GENDER', field: 'sex', style: 'width: auto;' },
        { header: 'TEST_PAGE.TABLE.OWNER', field: 'organizationName', style: 'width: auto;' },
        { header: 'TEST_PAGE.TABLE.BIRTH_DATE', field: 'birthDate', style: 'width: auto;' },
        { header: 'TEST_PAGE.TABLE.BREED', field: 'breed', style: '' }
    ];
    users = [
        { id: 1, nationalNumber: 'KZ123456780009', ownerXin: '000156849812', organizationName: 'ТОО "Агро-Инвест"', sex: false, breed: 'Абердин Ангус', birthDate: '2020-05-12T00:00:00' },
        { id: 2, nationalNumber: 'KZ123456780002', ownerXin: '454683213846', organizationName: 'ТОО "Агро-Инвест"', sex: true, breed: 'Белоголовая', birthDate: '2023-02-20T00:00:00' },
        { id: 3, nationalNumber: 'KZ123456780003', ownerXin: '547565895452', organizationName: 'АО "КазМяс"', sex: false, breed: 'Абердин Ангус', birthDate: '2019-06-30T00:00:00' },
        { id: 4, nationalNumber: 'KZ123456780004', ownerXin: '982354478458', organizationName: 'ТОО "Молочный мир"', sex: false, breed: 'Голштинская', birthDate: '2018-09-15T00:00:00' },
        { id: 5, nationalNumber: 'KZ123456780007', ownerXin: '950101000111', organizationName: 'ИП "Алиев"', sex: false, breed: 'Абердин Ангус', birthDate: '2023-08-01T00:00:00' }
    ];
    loadData () {
       this.api.get('/posts').subscribe(res => this.posts = res);

    }

    protected readonly Date = Date;
    protected readonly moment = moment;
}
