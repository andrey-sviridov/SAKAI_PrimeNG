import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    constructor(private translate: TranslateService) {
        // Устанавливаем язык по умолчанию
        translate.setDefaultLang('en');
        // Пытаемся использовать язык браузера, если он поддерживается, иначе используем английский
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang?.match(/en|ru/) ? browserLang : 'en');
    }

    ngOnInit() {
        // Можно добавить дополнительную логику инициализации здесь
    }
}
