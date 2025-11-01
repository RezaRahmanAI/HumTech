import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CtaButtonComponent } from './cta-button.component';

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CtaButtonComponent],
  template: `
    <header class="sticky top-0 z-50 backdrop-blur-xl">
      <div class="hidden border-b border-secondary-800/60 bg-secondary-950/80 text-[11px] font-medium uppercase tracking-[0.3em] text-accent/60 lg:block">
        <div class="section-container flex items-center justify-between py-2">
          <div class="flex items-center gap-6">
            <span>Global delivery partner</span>
            <span>Innovation studio &amp; academy</span>
          </div>
          <a routerLink="/contact" class="flex items-center gap-2 text-accent/60 hover:text-accent">
            <span class="inline-block h-2 w-2 rounded-full bg-primary"></span>
            <span>Connect with Hum Tech</span>
          </a>
        </div>
      </div>
      <nav class="section-container flex items-center justify-between py-4">
        <a routerLink="/" class="flex items-center gap-3 font-heading text-xl font-semibold text-secondary-900">
          <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/40">HT</span>
          <div class="leading-tight">
            <span>Hum Tech</span>
            <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-secondary-400">Digital Engineers</p>
          </div>
        </a>
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-secondary-200 bg-accent text-secondary-700 shadow-sm lg:hidden"
          (click)="toggleMobile()"
          aria-label="Toggle navigation"
        >
          <span class="sr-only">Toggle navigation</span>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>
        </button>
        <div class="hidden items-center gap-10 lg:flex">
          <ul class="flex items-center gap-8 text-sm font-semibold text-secondary-600">
            <li *ngFor="let item of navItems()" class="group relative">
              <a
                [routerLink]="item.path"
                routerLinkActive="text-primary"
                [routerLinkActiveOptions]="{ exact: true }"
                class="inline-flex flex-col items-center gap-1 transition-colors hover:text-primary"
              >
                <span>{{ item.label }}</span>
                <span class="h-0.5 w-0 rounded-full bg-primary transition-all duration-200 group-hover:w-4" routerLinkActive="w-6"></span>
              </a>
              <ul
                *ngIf="item.children?.length"
                class="invisible absolute left-1/2 top-full z-20 mt-4 w-60 -translate-x-1/2 rounded-2xl bg-accent p-4 opacity-0 shadow-xl shadow-secondary-900/10 ring-1 ring-secondary-100 transition-all group-hover:visible group-hover:opacity-100"
              >
                <li *ngFor="let child of item.children">
                  <a
                    [routerLink]="child.path"
                    class="block rounded-xl px-3 py-2 text-sm text-secondary-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    {{ child.label }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <app-cta-button type="link" variant="primary" href="/contact">Start a project</app-cta-button>
        </div>
      </nav>
      <div class="lg:hidden" *ngIf="isMobileOpen()">
        <div class="border-t border-secondary-100 bg-accent/95 shadow-lg shadow-secondary-900/10">
          <ul class="space-y-2 px-4 py-5 text-secondary-700">
            <li *ngFor="let item of navItems()" class="rounded-2xl border border-transparent bg-white/40 p-3 shadow-sm shadow-secondary-900/5">
              <a
                [routerLink]="item.path"
                (click)="toggleMobile(false)"
                class="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-secondary-700 transition-colors hover:text-primary"
              >
                {{ item.label }}
                <span *ngIf="item.children?.length" class="text-xs text-secondary-400">{{ item.children?.length ?? 0 }}</span>
              </a>
              <ul *ngIf="item.children?.length" class="mt-3 space-y-2 pl-4 text-xs font-medium text-secondary-500">
                <li *ngFor="let child of item.children">
                  <a [routerLink]="child.path" (click)="toggleMobile(false)" class="block rounded-lg py-2 text-secondary-500 transition-colors hover:text-primary">
                    {{ child.label }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="border-t border-secondary-100/80 px-4 py-4">
            <div class="flex justify-center">
              <app-cta-button type="link" variant="primary" href="/contact">Start a project</app-cta-button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly _items = signal<NavItem[]>([]);
  protected readonly isMobileOpen = signal(false);

  protected readonly navItems = this._items.asReadonly();

  @Input({ required: true })
  set items(value: NavItem[]) {
    this._items.set(value ?? []);
  }

  toggleMobile(force?: boolean): void {
    this.isMobileOpen.set(force ?? !this.isMobileOpen());
  }
}
