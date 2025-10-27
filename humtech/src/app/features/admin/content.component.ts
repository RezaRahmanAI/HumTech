import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroService } from '../../core/services/hero.service';
import { StatsService } from '../../core/services/stats.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-content',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Homepage & impact metrics</h2>
          <p class="text-sm text-secondary-600">
            Keep the hero narrative, calls-to-action, and headline stats aligned with the latest go-to-market priorities.
          </p>
        </div>
        <app-cta-button variant="primary" type="button">Publish updates</app-cta-button>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <article class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm">
          <header class="mb-4 flex items-center justify-between">
            <h3 class="font-heading text-lg font-semibold text-secondary-900">Homepage hero</h3>
            <span class="rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-600"
              >{{ hero().id }}</span
            >
          </header>
          <h4 class="text-xl font-semibold text-secondary-900">{{ hero().title }}</h4>
          <p class="mt-3 text-sm text-secondary-600">{{ hero().subtitle }}</p>
          <dl class="mt-4 grid gap-3 text-sm text-secondary-600">
            <div>
              <dt class="font-semibold text-secondary-700">Primary CTA</dt>
              <dd>{{ hero().ctaLabel }} · {{ hero().ctaLink }}</dd>
            </div>
            <div *ngIf="hero().secondaryCtaLabel">
              <dt class="font-semibold text-secondary-700">Secondary CTA</dt>
              <dd>{{ hero().secondaryCtaLabel }} · {{ hero().secondaryCtaLink }}</dd>
            </div>
          </dl>
          <ul class="mt-6 space-y-2 text-sm text-secondary-600">
            <li *ngFor="let highlight of hero().highlights" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="font-heading text-lg font-semibold text-secondary-900">Impact metrics</h3>
            <span class="rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-600"
              >{{ stats().length }} total</span
            >
          </div>
          <div class="mt-4 overflow-hidden rounded-2xl border border-secondary-100">
            <table class="min-w-full divide-y divide-secondary-100 text-sm">
              <thead class="bg-secondary-50 text-secondary-500">
                <tr>
                  <th class="px-4 py-2 text-left font-semibold">Label</th>
                  <th class="px-4 py-2 text-left font-semibold">Value</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-secondary-100 bg-accent text-secondary-700">
                <tr *ngFor="let metric of stats()">
                  <td class="px-4 py-2 font-medium text-secondary-900">{{ metric.label }}</td>
                  <td class="px-4 py-2">{{ metric.value }}{{ metric.suffix || '' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContentComponent {
  private readonly heroService = inject(HeroService);
  private readonly statsService = inject(StatsService);

  readonly hero = toSignal(this.heroService.getHero(), {
    initialValue: {
      id: '',
      title: '',
      subtitle: '',
      ctaLabel: '',
      ctaLink: '',
      secondaryCtaLabel: '',
      secondaryCtaLink: '',
      backgroundImage: '',
      highlights: [],
    },
  });

  readonly stats = toSignal(this.statsService.getAll(), { initialValue: [] });
}
