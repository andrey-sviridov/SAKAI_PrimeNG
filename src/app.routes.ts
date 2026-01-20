import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/app-layout/app.layout';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Documentation } from '@/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing';
import { Notfound } from '@/pages/notfound/notfound';
import { CustomLayout } from '@/layout/custom-layout/custom-layout';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('@/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('@/pages/pages.routes') }
        ]
    },
    {
        path: 'custom',
        component: CustomLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('@/pages/uikit/uikit.routes') },
            { path: 'test', loadChildren: () => import('@/pages/test-page/test-page.routes') },
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('@/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
