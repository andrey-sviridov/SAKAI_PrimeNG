import { Component, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { AppTopbar } from '@/layout/app-topbar';
import { LayoutService } from '@/core/services/layout.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AppFooter } from '@/layout/app-footer';
import { NgClass } from '@angular/common';
import { AppSideBar } from '@/layout/app-side-bar/app-side-bar';
import { LoadingService } from '@/core/services/loading.service';

// Импорт анимации
import { slideLeftRightAnimation } from './route-animations'; // Укажите правильный путь

@Component({
    selector: 'app-app-layout',
    imports: [
        AppFooter,
        RouterOutlet,
        NgClass,
        AppTopbar,
        AppSideBar
    ],
    templateUrl: './app-layout.html',
    standalone: true,
    styleUrl: './app-layout.scss',
    animations: [slideLeftRightAnimation] // <--- Подключаем анимацию
})
export class AppLayout implements OnDestroy {
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;

    @ViewChild(AppSideBar) appSidebar!: AppSideBar;
    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        public loader: LoadingService
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    // Метод для определения состояния анимации
    prepareRoute(outlet: RouterOutlet) {
        const animationState = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];

        // Удалите эту строку, когда заработает:
        console.log('Animation State:', animationState);

        return animationState;
    }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
