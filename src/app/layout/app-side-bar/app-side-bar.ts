import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '@/layout/app-menuitem';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-side-bar',
    imports: [
        AppMenuitem
    ],
    templateUrl: './app-side-bar.html',
    standalone: true,
    styleUrl: './app-side-bar.scss'
})
export class AppSideBar implements OnInit {
  constructor(private translate: TranslateService) {}
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'SIDEBAR.HOME',
                items: [{ label: this.translate.instant('SIDEBAR.HOME'), icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: this.translate.instant('SIDEBAR.HOME'),
                items: [{ label: this.translate.instant('SIDEBAR.DASHBOARD'), icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: this.translate.instant('SIDEBAR.TEST_PAGE'),
                items: [{ label: this.translate.instant('SIDEBAR.TEST_PAGE'), icon: 'pi pi-fw pi-id-card', routerLink: ['/test'] }]
            },
            {
                label: this.translate.instant('SIDEBAR.UI_COMPONENTS'),
                items: [
                    { label: this.translate.instant('SIDEBAR.FORM_LAYOUT'), icon: 'pi pi-fw pi-id-card', routerLink: ['/custom/uikit/formlayout'] },
                ]
            },
            {
                label: this.translate.instant('SIDEBAR.PAGES'),
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: this.translate.instant('SIDEBAR.LANDING'),
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: this.translate.instant('SIDEBAR.AUTH'),
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: this.translate.instant('SIDEBAR.LOGIN'),
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: this.translate.instant('SIDEBAR.ERROR'),
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: this.translate.instant('SIDEBAR.ACCESS_DENIED'),
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: this.translate.instant('SIDEBAR.CRUD'),
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: this.translate.instant('SIDEBAR.NOT_FOUND'),
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: this.translate.instant('SIDEBAR.EMPTY'),
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: this.translate.instant('SIDEBAR.HIERARCHY'),
                items: [
                    {
                        label: this.translate.instant('SIDEBAR.SUBMENU_1'),
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: this.translate.instant('SIDEBAR.SUBMENU_1_1'),
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: this.translate.instant('SIDEBAR.SUBMENU_1_1_1'), icon: 'pi pi-fw pi-bookmark' },
                                    { label: this.translate.instant('SIDEBAR.SUBMENU_1_1_2'), icon: 'pi pi-fw pi-bookmark' },
                                    { label: this.translate.instant('SIDEBAR.SUBMENU_1_1_3'), icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }
        ];
    }
}
