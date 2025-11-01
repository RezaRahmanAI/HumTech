import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCategory } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { CtaButtonComponent } from './cta-button.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CtaButtonComponent],
  template: `
    <article
      appScrollReveal
      class="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-accent shadow-xl shadow-secondary-900/5 ring-1 ring-secondary-100/60 transition-transform duration-300 hover:-translate-y-2 hover:ring-primary/40"
    >
      <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600"></span>
      <div class="flex items-center gap-4 px-6 pt-8">
        <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 ring-1 ring-primary/20">
          <i class="iconify text-xl" [attr.data-icon]="service.icon"></i>
        </span>
        <h3 class="font-heading text-xl font-semibold text-secondary-900 group-hover:text-primary-700">{{ service.title }}</h3>
      </div>
      <p class="px-6 pt-4 text-sm leading-relaxed text-secondary-600">{{ service.description }}</p>
      <div class="px-6 pt-6">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-secondary-500">Key capabilities</h4>
        <ul class="mt-3 space-y-2 text-sm text-secondary-700">
          <li *ngFor="let feature of service.features" class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
      <div class="px-6 pt-6">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-secondary-500">Tech stack</h4>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            *ngFor="let tech of service.technologies"
            class="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary-700"
          >
            {{ tech }}
          </span>
        </div>
      </div>
      <div class="mt-auto px-6 pb-8 pt-6">
        <app-cta-button type="link" variant="ghost" [href]="service.link">Explore service</app-cta-button>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceCategory;
}
