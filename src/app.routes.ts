import { Routes } from '@angular/router';
import { PreviewLayout } from '@/layout/app-preview-layout/preview.layout';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Documentation } from '@/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing';
import { Notfound } from '@/pages/notfound/notfound';
import { AppLayout } from '@/layout/app-layout/app-layout';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard, data: { animation: 'Dashboard' } },
            { path: 'uikit', loadChildren: () => import('@/pages/uikit/uikit.routes'), data: { animation: 'Uikit' } },
            { path: 'documentation', component: Documentation, data: { animation: 'Doc' } },
            { path: 'pages', loadChildren: () => import('@/pages/pages.routes'), data: { animation: 'Pages' } },
            { path: 'test', loadChildren: () => import('@/pages/test-page/test-page.routes'), data: { animation: 'Test' } },
        ]
    },
    {
        path: 'preview',
        component: PreviewLayout,
        children: [
            { path: '', component: Dashboard, data: { animation: 'PrDashboard' } },
            { path: 'uikit', loadChildren: () => import('@/pages/uikit/uikit.routes'), data: { animation: 'PrUikit' } },
        ]
    },
    { path: 'landing', component: Landing, data: { animation: 'Landing' } },
    { path: 'notfound', component: Notfound, data: { animation: 'NotFound' } },
    { path: 'auth', loadChildren: () => import('@/pages/auth/auth.routes'), data: { animation: 'Auth' } },
    { path: '**', redirectTo: '/notfound', data: { animation: 'NotFoundTwo' } }
];
