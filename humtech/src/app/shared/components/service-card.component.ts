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
      class="flex h-full flex-col gap-4 rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm transition-transform hover:-translate-y-1"
    >
      <div class="flex items-center gap-3">
        <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <i class="iconify" [attr.data-icon]="service.icon"></i>
        </span>
        <h3 class="font-heading text-xl font-semibold text-secondary-900">{{ service.title }}</h3>
      </div>
      <p class="text-sm text-secondary-600">{{ service.description }}</p>
      <div class="grid flex-1 gap-2 text-sm text-secondary-600">
        <div>
          <h4 class="font-semibold text-secondary-800">Key features</h4>
          <ul class="mt-2 space-y-1 text-secondary-600">
            <li *ngFor="let feature of service.features" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-secondary-800">Tech stack</h4>
          <div class="mt-2 flex flex-wrap gap-2">
            <span
              *ngFor="let tech of service.technologies"
              class="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
      <app-cta-button type="link" variant="ghost" [href]="service.link">Explore service</app-cta-button>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceCategory;
}
