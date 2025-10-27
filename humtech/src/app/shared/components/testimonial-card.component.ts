import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <figure appScrollReveal class="flex h-full flex-col gap-4 rounded-3xl border border-secondary-100 bg-accent p-6">
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
      <blockquote class="flex-1 text-sm text-secondary-700">“{{ testimonial.review }}”</blockquote>
      <div class="flex items-center gap-1 text-primary">
        <span class="text-sm font-semibold">{{ testimonial.rating | number: '1.1-1' }}</span>
        <span aria-hidden="true">★</span>
      </div>
    </figure>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: Testimonial;
}
