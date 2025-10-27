import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Testimonials</h2>
          <p class="text-sm text-secondary-600">Manage client stories and reviews.</p>
        </div>
        <app-cta-button variant="primary" type="button">Add testimonial</app-cta-button>
      </div>
      <div class="overflow-hidden rounded-3xl border border-secondary-100">
        <table class="min-w-full divide-y divide-secondary-100 text-sm">
          <thead class="bg-secondary-50 text-secondary-500">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Client</th>
              <th class="px-4 py-3 text-left font-semibold">Company</th>
              <th class="px-4 py-3 text-left font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-100 bg-accent">
            <tr *ngFor="let testimonial of testimonials()" class="text-secondary-700">
              <td class="px-4 py-3 font-medium text-secondary-900">{{ testimonial.clientName }}</td>
              <td class="px-4 py-3">{{ testimonial.company }}</td>
              <td class="px-4 py-3">{{ testimonial.rating }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTestimonialsComponent {
  private readonly testimonialsService = inject(TestimonialsService);
  readonly testimonials = toSignal(this.testimonialsService.getAll(), { initialValue: [] });
}
