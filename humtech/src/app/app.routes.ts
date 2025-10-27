import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes'),
      },
      {
        path: 'services',
        loadChildren: () => import('./features/services/services.routes'),
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes'),
      },
      {
        path: 'harm-academy',
        loadChildren: () => import('./features/academy/academy.routes'),
      },
      {
        path: 'careers',
        loadChildren: () => import('./features/careers/careers.routes'),
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes'),
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.routes'),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
  },
  { path: '**', redirectTo: '' },
];
