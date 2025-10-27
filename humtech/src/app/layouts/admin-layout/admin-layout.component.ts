import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../../shared/components/tabs.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabsComponent],
  template: `
    <div class="grid min-h-screen lg:grid-cols-[260px_1fr]">
      <aside class="hidden flex-col gap-6 border-r border-secondary-100 bg-accent px-6 py-10 lg:flex">
        <h1 class="font-heading text-xl font-semibold text-secondary-900">Admin Control</h1>
        <app-tabs
          [tabs]="[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'services', label: 'Services' },
            { id: 'team', label: 'Team' },
            { id: 'jobs', label: 'Jobs' },
            { id: 'blog', label: 'Blog' }
          ]"
          [activeTab]="'dashboard'"
        ></app-tabs>
      </aside>
      <section class="min-h-screen bg-secondary-50">
        <header class="border-b border-secondary-100 bg-accent px-6 py-4">
          <h2 class="font-heading text-lg font-semibold text-secondary-900">Administration</h2>
        </header>
        <div class="px-6 py-8">
          <router-outlet></router-outlet>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {}
