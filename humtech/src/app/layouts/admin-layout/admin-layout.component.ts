import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface AdminNavItem {
  label: string;
  description: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="grid min-h-screen lg:grid-cols-[260px_1fr]">
      <aside class="hidden flex-col gap-6 border-r border-secondary-100 bg-accent px-6 py-10 lg:flex">
        <div>
          <h1 class="font-heading text-xl font-semibold text-secondary-900">Admin Control</h1>
          <p class="mt-2 text-xs text-secondary-500">Navigate between every content module.</p>
        </div>
        <nav class="flex flex-col gap-2 text-sm">
          <a
            *ngFor="let item of navigation"
            [routerLink]="item.route"
            [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
            routerLinkActive="active"
            #rla="routerLinkActive"
            class="group rounded-2xl px-4 py-3 transition"
            [ngClass]="
              rla.isActive
                ? 'bg-primary text-accent shadow-md'
                : 'bg-accent text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
            "
          >
            <span class="block font-semibold">{{ item.label }}</span>
            <span class="text-xs font-normal" [ngClass]="rla.isActive ? 'text-accent/90' : 'text-secondary-500'">
              {{ item.description }}
            </span>
          </a>
        </nav>
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
export class AdminLayoutComponent {
  readonly navigation: AdminNavItem[] = [
    { label: 'Dashboard', description: 'Overview & quick actions', route: '/admin/dashboard', exact: true },
    { label: 'Homepage & stats', description: 'Hero messaging and KPIs', route: '/admin/content' },
    { label: 'Services', description: 'ERP, Android, AI, Harm Academy', route: '/admin/services' },
    { label: 'Team', description: 'Leaders & delivery experts', route: '/admin/team' },
    { label: 'Jobs', description: 'Open roles & hiring pipeline', route: '/admin/jobs' },
    { label: 'Blog', description: 'Thought leadership & updates', route: '/admin/blog' },
    { label: 'Testimonials', description: 'Client and partner stories', route: '/admin/testimonials' },
    { label: 'Courses', description: 'Harm Academy programs', route: '/admin/courses' },
    { label: 'FAQs', description: 'Knowledge base entries', route: '/admin/faq' },
    { label: 'Settings', description: 'Contact channels & preferences', route: '/admin/settings' },
  ];
}
