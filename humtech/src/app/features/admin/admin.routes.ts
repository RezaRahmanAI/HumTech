import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { AdminDashboardComponent } from './dashboard.component';
import { AdminServicesComponent } from './services.component';
import { AdminTeamComponent } from './team.component';
import { AdminJobsComponent } from './jobs.component';
import { AdminBlogComponent } from './blog.component';
import { AdminTestimonialsComponent } from './testimonials.component';
import { AdminSettingsComponent } from './settings.component';

export default [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'services', component: AdminServicesComponent },
      { path: 'team', component: AdminTeamComponent },
      { path: 'jobs', component: AdminJobsComponent },
      { path: 'blog', component: AdminBlogComponent },
      { path: 'testimonials', component: AdminTestimonialsComponent },
      { path: 'settings', component: AdminSettingsComponent },
    ],
  },
] satisfies Routes;
