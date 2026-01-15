import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appTableTemplate]'
})
export class TableTemplateDirective {
    @Input('') name: string = '';

    constructor(public template: TemplateRef<any>) {}
}
