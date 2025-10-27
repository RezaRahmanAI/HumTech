import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FaqService } from '../../core/services/faq.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-faq',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Knowledge base</h2>
          <p class="text-sm text-secondary-600">
            Keep prospect and customer questions current to support sales, onboarding, and support teams.
          </p>
        </div>
        <app-cta-button variant="primary" type="button">Add FAQ</app-cta-button>
      </div>

      <div class="overflow-hidden rounded-3xl border border-secondary-100">
        <table class="min-w-full divide-y divide-secondary-100 text-sm">
          <thead class="bg-secondary-50 text-secondary-500">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Question</th>
              <th class="px-4 py-3 text-left font-semibold">Category</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-100 bg-accent text-secondary-700">
            <tr *ngFor="let item of faq()">
              <td class="px-4 py-3">
                <p class="font-semibold text-secondary-900">{{ item.question }}</p>
                <p class="mt-1 text-secondary-600">{{ item.answer }}</p>
              </td>
              <td class="px-4 py-3 align-top text-secondary-600">{{ item.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFaqComponent {
  private readonly faqService = inject(FaqService);

  readonly faq = toSignal(this.faqService.getAll(), { initialValue: [] });
}
