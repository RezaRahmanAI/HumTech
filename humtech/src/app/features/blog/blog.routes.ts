import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list.component';
import { BlogDetailComponent } from './blog-detail.component';

export default [
  { path: '', component: BlogListComponent },
  { path: ':id', component: BlogDetailComponent },
] satisfies Routes;
