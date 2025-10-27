import { Routes } from '@angular/router';
import { ServicesListComponent } from './services-list.component';
import { ServiceDetailComponent } from './service-detail.component';

export default [
  { path: '', component: ServicesListComponent },
  { path: ':id', component: ServiceDetailComponent },
] satisfies Routes;
