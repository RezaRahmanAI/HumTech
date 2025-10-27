import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ServicesService } from '../../core/services/services.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Services</h2>
          <p class="text-sm text-secondary-600">Manage service categories, capabilities, and case studies.</p>
        </div>
        <app-cta-button variant="primary" type="button">Add service</app-cta-button>
      </div>
      <div class="overflow-hidden rounded-3xl border border-secondary-100">
        <table class="min-w-full divide-y divide-secondary-100 text-sm">
          <thead class="bg-secondary-50 text-secondary-500">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Title</th>
              <th class="px-4 py-3 text-left font-semibold">Technologies</th>
              <th class="px-4 py-3 text-left font-semibold">Features</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-100 bg-accent">
            <tr *ngFor="let service of services()" class="text-secondary-700">
              <td class="px-4 py-3 font-medium text-secondary-900">{{ service.title }}</td>
              <td class="px-4 py-3">{{ service.technologies.join(', ') }}</td>
              <td class="px-4 py-3">{{ service.features.length }} items</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminServicesComponent {
  private readonly servicesService = inject(ServicesService);
  readonly services = toSignal(this.servicesService.getAll(), { initialValue: [] });
}
