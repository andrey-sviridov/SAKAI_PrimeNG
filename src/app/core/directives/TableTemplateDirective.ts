import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[columnName]', // <--- Важно! Должно совпадать с тем, что в HTML
    standalone: true
})
export class TableTemplateDirective {
    @Input('columnName') name: string = ''; // Имя, по которому будем искать шаблон

    constructor(public template: TemplateRef<any>) {}
}
