import { Routes } from '@angular/router';
import { CareersPageComponent } from './careers.component';
import { JobDetailComponent } from './job-detail.component';

export default [
  { path: '', component: CareersPageComponent },
  { path: ':id', component: JobDetailComponent },
] satisfies Routes;
