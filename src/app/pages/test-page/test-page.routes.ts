import { Routes } from '@angular/router';
import { TestPage } from '@/pages/test-page/test-page';

export default [
    { path: '', data: { breadcrumb: '' }, component: TestPage },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
