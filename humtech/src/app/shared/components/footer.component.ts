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
    <footer class="bg-secondary-900 text-accent">
      <div class="section-container grid gap-10 py-12 lg:grid-cols-[1.5fr,repeat(3,minmax(0,1fr))]">
        <div>
          <div class="flex items-center gap-3 font-heading text-2xl font-semibold">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-accent">HT</span>
            <span>Hum Tech</span>
          </div>
          <p class="mt-4 max-w-md text-sm text-accent-300">
            Building modern digital platforms, AI copilots, and go-to-market academies that move enterprises forward with confidence.
          </p>
          <form class="mt-6 flex flex-col gap-3 sm:flex-row" (submit)="onSubscribe($event)">
            <label class="w-full">
              <span class="sr-only">Email</span>
              <input
                type="email"
                name="email"
                required
                class="w-full rounded-lg border border-secondary-700 bg-secondary-800 px-4 py-3 text-sm text-accent placeholder:text-secondary-400 focus:border-primary focus:outline-none focus:ring focus:ring-primary-200"
                placeholder="Enter your email"
              />
            </label>
            <button type="submit" class="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-primary-600">
              Join Newsletter
            </button>
          </form>
        </div>
        <ng-container *ngFor="let column of columns">
          <div>
            <h3 class="font-heading text-base font-semibold text-accent">{{ column.title }}</h3>
            <ul class="mt-4 space-y-2 text-sm text-accent-300">
              <li *ngFor="let link of column.links">
                <a [routerLink]="link.path" class="transition-colors hover:text-primary-200">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </ng-container>
        <div>
          <h3 class="font-heading text-base font-semibold text-accent">Connect</h3>
          <ul class="mt-4 space-y-3 text-sm text-accent-300">
            <li *ngFor="let socialLink of social">
              <a [href]="socialLink.url" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-primary-200">
                {{ socialLink.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-secondary-800 bg-secondary-950/60 py-6">
        <div class="section-container flex flex-col items-start gap-2 text-xs text-accent-400 sm:flex-row sm:items-center sm:justify-between">
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
