import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <figure
      appScrollReveal
      class="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-secondary-100/60 bg-accent p-8 shadow-lg shadow-secondary-900/10"
    >
      <span class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600"></span>
      <div class="flex items-center gap-4">
        <img
          [src]="testimonial.photo"
          [alt]="testimonial.clientName"
          class="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <figcaption class="font-heading text-base font-semibold text-secondary-900">{{ testimonial.clientName }}</figcaption>
          <p class="text-xs uppercase tracking-wide text-secondary-500">{{ testimonial.company }}</p>
        </div>
      </div>
      <blockquote class="flex-1 text-sm leading-relaxed text-secondary-600">“{{ testimonial.review }}”</blockquote>
      <div class="flex items-center gap-2 text-primary-600">
        <span class="text-sm font-semibold">{{ testimonial.rating | number: '1.1-1' }}</span>
        <span aria-hidden="true" class="text-base">★</span>
      </div>
    </figure>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: Testimonial;
}
