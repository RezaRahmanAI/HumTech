import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; path: string }>;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="relative overflow-hidden bg-secondary-950 text-accent">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),transparent_60%)]"></div>
      <div class="section-container relative z-10 grid gap-12 py-16 lg:grid-cols-[1.5fr,repeat(3,minmax(0,1fr))]">
        <div>
          <div class="flex items-center gap-3 font-heading text-2xl font-semibold">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/40">HT</span>
            <span>Hum Tech</span>
          </div>
          <p class="mt-5 max-w-md text-sm leading-relaxed text-accent/70">
            Building modern digital platforms, AI copilots, and go-to-market academies that move enterprises forward with confidence.
          </p>
          <form class="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" (submit)="onSubscribe($event)">
            <label class="relative block">
              <span class="sr-only">Email</span>
              <input
                type="email"
                name="email"
                required
                class="w-full rounded-2xl border border-secondary-700/60 bg-secondary-900/60 px-4 py-3 text-sm text-accent placeholder:text-accent/40 focus:border-primary focus:outline-none focus:ring focus:ring-primary-200"
                placeholder="Enter your email"
              />
              <span class="pointer-events-none absolute inset-y-0 right-4 inline-flex items-center text-xs uppercase tracking-[0.3em] text-accent/30">Stay updated</span>
            </label>
            <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary-500/30 transition-transform hover:-translate-y-0.5">
              Join Newsletter
            </button>
          </form>
        </div>
        <ng-container *ngFor="let column of columns">
          <div>
            <h3 class="font-heading text-base font-semibold text-accent">{{ column.title }}</h3>
            <ul class="mt-4 space-y-2 text-sm text-accent/60">
              <li *ngFor="let link of column.links">
                <a [routerLink]="link.path" class="transition-colors hover:text-primary-200">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </ng-container>
        <div>
          <h3 class="font-heading text-base font-semibold text-accent">Connect</h3>
          <ul class="mt-4 space-y-3 text-sm text-accent/60">
            <li *ngFor="let socialLink of social">
              <a [href]="socialLink.url" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-primary-200">
                {{ socialLink.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="relative border-t border-secondary-800/60 py-6">
        <div class="section-container relative z-10 flex flex-col items-start gap-2 text-xs text-accent/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {{ currentYear }} Hum Tech. All rights reserved.</span>
          <div class="flex flex-wrap gap-4">
            <a routerLink="/privacy" class="hover:text-primary-200">Privacy</a>
            <a routerLink="/terms" class="hover:text-primary-200">Terms</a>
            <a routerLink="/security" class="hover:text-primary-200">Security</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input({ required: true }) columns: FooterColumn[] = [];
  @Input({ required: true }) social: Array<{ label: string; url: string }> = [];

  protected readonly currentYear = new Date().getFullYear();

  onSubscribe(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.reset();
  }
}
