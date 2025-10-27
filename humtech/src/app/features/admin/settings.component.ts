import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactService } from '../../core/services/contact.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Settings</h2>
          <p class="text-sm text-secondary-600">Manage company profile and contact channels.</p>
        </div>
        <app-cta-button variant="primary" type="button">Save changes</app-cta-button>
      </div>
      <div class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">
        <p><strong>Email:</strong> {{ info().email }}</p>
        <p class="mt-2"><strong>Phone:</strong> {{ info().phone }}</p>
        <p class="mt-2"><strong>Address:</strong> {{ info().address }}</p>
        <p class="mt-2"><strong>Office hours:</strong> {{ info().officeHours }}</p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSettingsComponent {
  private readonly contactService = inject(ContactService);
  readonly info = toSignal(this.contactService.getContactInformation(), {
    initialValue: {
      address: '',
      phone: '',
      email: '',
      social: [],
      mapEmbedUrl: '',
      officeHours: '',
    },
  });
}
