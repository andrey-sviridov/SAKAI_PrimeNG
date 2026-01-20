import { Component, Input, Output, EventEmitter, signal, computed, effect, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '@/core/services/api.service';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-cattle-table',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DatePipe,
        Button
    ],
    templateUrl: './custom-cattle-table.html',
})
export class CattleTableComponent {
    private api = inject(ApiService);

    // --- Inputs ---
    @Input() filtersValue: any[] = [];
    @Input() displayedColumns: any = {};
    @Input() dynamicFilters = false;
    @Input() rowsPerPage = 10;

    // Сигнал для обновления данных извне
    @Input() set refresh(val: any) {
        if (val) this.loadData();
    }

    // --- Outputs ---
    @Output() selectedCattle = new EventEmitter<Cattle[]>();
    @Output() queryObjectChanged = new EventEmitter<any>();

    // --- State (Signals) ---
    data: Cattle[] = [];
    totalRows = signal(0);
    loading = signal(false);
    selected = signal<Set<number>>(new Set()); // Храним ID выбранных

    searchValue = signal('');
    options = signal<TableOptions>({
        page: 1,
        itemsPerPage: 10,
        sortBy: 'id',
        sortDesc: false
    });

    applyFiltersData = signal<any[]>([]);

    constructor() {
        // Эффект: при изменении опций или поиска перезагружаем данные
        effect(() => {
            this.loadData();
        }, { allowSignalWrites: true });
    }

    // --- Computed Headers ---
    // В реальном приложении логику скрытия колонок лучше вынести в конфиг
    headers = () => {
        const cols = [];
        const dc = this.displayedColumns;

        // Всегда добавляем чекбокс и №
        cols.push({ label: '№', key: 'id', sortable: false });

        cols.push({ label: 'Владелец', key: 'organizationName', sortable: true });
        cols.push({ label: 'Животное', key: 'nationalNumber', sortable: true });
        cols.push({ label: 'Пол', key: 'gender', sortable: true });
        cols.push({ label: 'Дата рождения', key: 'birthDate', sortable: true });
        cols.push({ label: 'Порода', key: 'breedId', sortable: true });
        cols.push({ label: 'Статус', key: 'productionStatus', sortable: true });
        cols.push({ label: 'Плем.статус', key: 'chamberNumber', sortable: true });
        cols.push({ label: 'Местонахождение', key: 'herdAndGroupInfo', sortable: false });
        cols.push({ label: 'Отец', key: 'sireIdentNumber', sortable: false });
        cols.push({ label: 'Мать', key: 'damIdentNumber', sortable: false });

        return cols;
    };

    // --- Methods ---

    loadData() {
        this.addAnimals()
        this.loading.set(false);
        const query = {
            ...this.options(),
            search: this.searchValue(),
            filters: [...this.filtersValue, ...this.applyFiltersData()]
        };

        // this.api.list(query).subscribe({
        //     next: (res) => {
        //         this.data = res.data;
        //         this.totalRows.set(res.totalRows);
        //         this.loading.set(false);
        //         this.queryObjectChanged.emit(query);
        //     },
        //     error: () => this.loading.set(false)
        // });
    }

    onQuickSearch(val: string) {
        this.searchValue.set(val);
    }

    onApplyFilters(filters: any[]) {
        this.applyFiltersData.set(filters);
        this.options.update(o => ({ ...o, page: 1 })); // Сброс на 1 страницу
    }

    onPaginationChange(opts: Partial<TableOptions>) {
        this.options.update(current => ({ ...current, ...opts }));
    }

    // Selection Logic
    toggleSelection(item: Cattle) {
        this.selected.update(set => {
            const newSet = new Set(set);
            if (newSet.has(item.id)) newSet.delete(item.id);
            else newSet.add(item.id);
            this.emitSelection(newSet);
            return newSet;
        });
    }
    onToggleAll(event: Event) {
        // Безопасное приведение типа
        const input = event.target as HTMLInputElement;
        this.toggleAll(input.checked);
    }
    toggleAll(checked: boolean) {
        if (checked) {
            const allIds = this.data.map(i => i.id);
            this.selected.set(new Set(allIds));
        } else {
            this.selected.set(new Set());
        }
        this.emitSelection(this.selected());
    }

    private emitSelection(set: Set<number>) {
        const selectedItems = this.data.filter(i => set.has(i.id));
        this.selectedCattle.emit(selectedItems);
    }

    get allSelected() {
        return this.data.length > 0 && this.selected().size === this.data.length;
    }

    // Helpers (аналоги $T, $ET)
    translate(key: string, defaultVal: string) { return defaultVal; } // Mock

    // Статус бейдж (аналог getStatusColor)
    getStatusClass(status: string): string {
        const base = 'px-2 py-1 rounded-full text-xs font-medium';
        switch (status) {
            case 'NotInseminated': return `${base} bg-yellow-100 text-yellow-800`;
            case 'Inseminated': return `${base} bg-blue-100 text-blue-800`;
            case 'Doubtfull': return `${base} bg-gray-100 text-gray-800`;
            case 'Pregnant': return `${base} bg-green-100 text-green-800`;
            default: return `${base} bg-red-100 text-red-800`;
        }
    }

    // Расчет номера строки
    rowNo(index: number): number {
        return (this.options().page - 1) * this.options().itemsPerPage + index + 1;
    }

    addAnimals() {
        this.data = [
            {
                id: 1,
                organizationName: 'ТОО "Агро-Инвест"',
                organizationXin: '050140001234',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780001',
                birthDate: '2020-05-12T00:00:00',
                breedId: 1,
                breedName: 'Герефорд',
                breedityId: 10,
                productionStatus: 'Pregnant',
                chamberNumber: 'PL-101',
                herdAndGroupInfo: {
                    herdName: 'Ферма Север',
                    groupName: 'Маточное поголовье'
                },
                sireIdentNumber: 'KZ999000111001',
                sireBreedId: 1,
                damIdentNumber: 'KZ888000222001',
                damBreedId: 1
            },
            {
                id: 2,
                organizationName: 'КХ "Степное"',
                organizationXin: '110240005678',
                gender: 'MALE',
                nationalNumber: 'KZ123456780002',
                birthDate: '2023-02-20T00:00:00',
                breedId: 2,
                breedName: 'Ангус',
                breedityId: 10,
                productionStatus: 'NotInseminated',
                chamberNumber: undefined, // Товарное животное
                herdAndGroupInfo: {
                    herdName: 'Откормплощадка №3',
                    groupName: 'Бычки 2023'
                },
                sireIdentNumber: 'KZ999000111002',
                sireBreedId: 2,
                damIdentNumber: 'KZ888000222002',
                damBreedId: 2
            },
            {
                id: 3,
                organizationName: 'ТОО "Агро-Инвест"',
                organizationXin: '050140001234',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780003',
                birthDate: '2021-11-05T00:00:00',
                breedId: 1,
                breedName: 'Герефорд',
                breedityId: 20,
                productionStatus: 'Inseminated',
                chamberNumber: 'PL-205',
                herdAndGroupInfo: {
                    herdName: 'Ферма Север',
                    groupName: 'Группа осеменения'
                },
                sireIdentNumber: 'KZ999000111003',
                sireBreedId: 1,
                damIdentNumber: 'KZ888000222003',
                damBreedId: 1
            },
            {
                id: 4,
                organizationName: 'АО "КазМяс"',
                organizationXin: '080940009999',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780004',
                birthDate: '2019-06-30T00:00:00',
                breedId: 3,
                breedName: 'Казахская белоголовая',
                breedityId: 10,
                productionStatus: 'Doubtfull',
                chamberNumber: 'KZ-WHITE-77',
                herdAndGroupInfo: {
                    herdName: 'Центральная база',
                    groupName: 'Проблемные'
                },
                sireIdentNumber: 'KZ999000111004',
                sireBreedId: 3,
                damIdentNumber: 'KZ888000222004',
                damBreedId: 3
            },
            {
                id: 5,
                organizationName: 'КХ "Степное"',
                organizationXin: '110240005678',
                gender: 'MALE',
                nationalNumber: 'KZ123456780005',
                birthDate: '2024-01-10T00:00:00',
                breedId: 2,
                breedName: 'Ангус',
                breedityId: 30,
                productionStatus: 'NotInseminated',
                chamberNumber: undefined,
                herdAndGroupInfo: {
                    herdName: 'Телятник',
                    groupName: 'Молодняк 0-3 мес'
                },
                sireIdentNumber: 'KZ999000111005',
                sireBreedId: 2,
                damIdentNumber: 'KZ888000222005',
                damBreedId: 2
            },
            {
                id: 6,
                organizationName: 'ТОО "Молочный мир"',
                organizationXin: '040540003333',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780006',
                birthDate: '2018-09-15T00:00:00',
                breedId: 4,
                breedName: 'Голштинская',
                breedityId: 10,
                productionStatus: 'Pregnant',
                chamberNumber: 'HOL-555',
                herdAndGroupInfo: {
                    herdName: 'МТФ №1',
                    groupName: 'Лактация 3'
                },
                sireIdentNumber: 'US123456',
                sireBreedId: 4,
                damIdentNumber: 'KZ888000222006',
                damBreedId: 4
            },
            {
                id: 7,
                organizationName: 'ТОО "Агро-Инвест"',
                organizationXin: '050140001234',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780007',
                birthDate: '2022-04-20T00:00:00',
                breedId: 1,
                breedName: 'Герефорд',
                breedityId: 10,
                productionStatus: 'Inseminated',
                chamberNumber: 'PL-303',
                herdAndGroupInfo: {
                    herdName: 'Ферма Юг',
                    groupName: 'Телки случного возраста'
                },
                sireIdentNumber: 'KZ999000111007',
                sireBreedId: 1,
                damIdentNumber: 'KZ888000222007',
                damBreedId: 1
            },
            {
                id: 8,
                organizationName: 'ИП "Алиев"',
                organizationXin: '950101000111',
                gender: 'MALE',
                nationalNumber: 'KZ123456780008',
                birthDate: '2023-08-01T00:00:00',
                breedId: 5,
                breedName: 'Аулиекольская',
                breedityId: 20,
                productionStatus: 'NotInseminated',
                chamberNumber: undefined,
                herdAndGroupInfo: {
                    herdName: 'Выпас №2',
                    groupName: 'Нагул'
                },
                sireIdentNumber: 'KZ999000111008',
                sireBreedId: 5,
                damIdentNumber: 'KZ888000222008',
                damBreedId: 5
            },
            {
                id: 9,
                organizationName: 'АО "КазМяс"',
                organizationXin: '080940009999',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780009',
                birthDate: '2017-03-10T00:00:00',
                breedId: 3,
                breedName: 'Казахская белоголовая',
                breedityId: 10,
                productionStatus: 'Pregnant',
                chamberNumber: 'KZ-WHITE-12',
                herdAndGroupInfo: {
                    herdName: 'Центральная база',
                    groupName: 'Сухостой'
                },
                sireIdentNumber: 'KZ999000111009',
                sireBreedId: 3,
                damIdentNumber: 'KZ888000222009',
                damBreedId: 3
            },
            {
                id: 10,
                organizationName: 'ТОО "Молочный мир"',
                organizationXin: '040540003333',
                gender: 'FEMALE',
                nationalNumber: 'KZ123456780010',
                birthDate: '2021-01-25T00:00:00',
                breedId: 4,
                breedName: 'Голштинская',
                breedityId: 10,
                productionStatus: 'Doubtfull',
                chamberNumber: 'HOL-888',
                herdAndGroupInfo: {
                    herdName: 'МТФ №1',
                    groupName: 'Карантин'
                },
                sireIdentNumber: 'DE998877',
                sireBreedId: 4,
                damIdentNumber: 'KZ888000222010',
                damBreedId: 4
            }
        ];
    }
}



export interface Cattle {
    id: number;
    organizationName: string;
    organizationXin: string;
    gender: 'MALE' | 'FEMALE';
    nationalNumber: string;
    birthDate: string;
    breedId: number;
    breedName?: string; // Предполагаем, что бэк может вернуть имя или мы его мапим
    breedityId: number;
    productionStatus: 'NotInseminated' | 'Inseminated' | 'Doubtfull' | 'Pregnant';
    chamberNumber?: string;
    herdAndGroupInfo: {
        herdName: string;
        groupName: string;
    };
    sireIdentNumber: string;
    sireBreedId?: number;
    damIdentNumber: string;
    damBreedId?: number;
}

export interface TableOptions {
    page: number;
    itemsPerPage: number;
    sortBy: string;
    sortDesc: boolean;
}

export interface FilterInfo {
    key: string;
    value: any;
}
