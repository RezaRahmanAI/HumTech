import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-accent shadow-sm shadow-secondary-200/60 backdrop-blur">
      <nav class="section-container flex items-center justify-between py-4">
        <a routerLink="/" class="flex items-center gap-2 font-heading text-xl font-semibold text-primary-600">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary">HT</span>
          <span>Hum Tech</span>
        </a>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-secondary-200 text-secondary-700 lg:hidden"
          (click)="toggleMobile()"
          aria-label="Toggle navigation"
        >
          <span class="sr-only">Toggle navigation</span>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>
        </button>
        <ul class="hidden items-center gap-8 text-sm font-medium text-secondary-700 lg:flex">
          <li *ngFor="let item of navItems()" class="relative group">
            <a
              [routerLink]="item.path"
              routerLinkActive="text-primary"
              [routerLinkActiveOptions]="{ exact: true }"
              class="transition-colors hover:text-primary"
            >
              {{ item.label }}
            </a>
            <ul
              *ngIf="item.children?.length"
              class="invisible absolute left-1/2 top-full z-20 mt-3 w-56 -translate-x-1/2 rounded-xl border border-secondary-100 bg-accent p-4 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100"
            >
              <li *ngFor="let child of item.children">
                <a
                  [routerLink]="child.path"
                  class="block rounded-lg px-3 py-2 text-sm text-secondary-600 transition-colors hover:bg-primary-50 hover:text-primary"
                >
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div
        class="lg:hidden"
        *ngIf="isMobileOpen()"
      >
        <div class="border-t border-secondary-100 bg-accent">
          <ul class="space-y-1 px-4 py-4 text-secondary-700">
            <li *ngFor="let item of navItems()">
              <a
                [routerLink]="item.path"
                (click)="toggleMobile(false)"
                class="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary"
              >
                {{ item.label }}
                <span *ngIf="item.children?.length" class="text-xs text-secondary-400">{{ item.children?.length ?? 0 }}</span>
              </a>
              <ul *ngIf="item.children?.length" class="pl-4 text-xs text-secondary-500">
                <li *ngFor="let child of item.children">
                  <a [routerLink]="child.path" (click)="toggleMobile(false)" class="block py-2 hover:text-primary">
                    {{ child.label }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
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
