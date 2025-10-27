import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactService } from '../../core/services/contact.service';
import { FormInputComponent } from '../../shared/components/form-input.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, CtaButtonComponent, SafeUrlPipe],
  template: `
    <section class="bg-secondary-50 py-12">
      <div class="section-container space-y-4">
        <h1 class="font-heading text-4xl font-semibold text-secondary-900">Let’s build together</h1>
        <p class="max-w-3xl text-sm text-secondary-600">
          Share your goals, product ideas, or talent needs and our consultants will reach out within one business day.
        </p>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <form class="space-y-4" [formGroup]="contactForm" (ngSubmit)="submit()">
          <div class="grid gap-4 md:grid-cols-2">
            <app-form-input label="Full name" [control]="contactForm.controls['name']"></app-form-input>
            <app-form-input label="Company" [control]="contactForm.controls['company']"></app-form-input>
            <app-form-input label="Email" type="email" [control]="contactForm.controls['email']"></app-form-input>
            <app-form-input label="Phone" type="tel" [control]="contactForm.controls['phone']"></app-form-input>
          </div>
          <app-form-input
            label="Project type"
            type="select"
            [options]="topicOptions"
            [control]="contactForm.controls['topic']"
            placeholder="Select interest"
          ></app-form-input>
          <app-form-input
            label="How can we help?"
            type="textarea"
            [rows]="6"
            [control]="contactForm.controls['message']"
          ></app-form-input>
          <div class="flex justify-end">
            <app-cta-button variant="primary" type="button" (click)="submit()">Submit inquiry</app-cta-button>
          </div>
        </form>
        <aside class="space-y-6">
          <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
            <h3 class="font-heading text-xl font-semibold text-secondary-900">Contact</h3>
            <ul class="mt-4 space-y-2 text-sm text-secondary-600">
              <li><strong>Email:</strong> {{ info().email }}</li>
              <li><strong>Phone:</strong> {{ info().phone }}</li>
              <li><strong>Address:</strong> {{ info().address }}</li>
              <li><strong>Office hours:</strong> {{ info().officeHours }}</li>
            </ul>
          </div>
          <div class="overflow-hidden rounded-3xl border border-secondary-100">
            <iframe
              class="h-64 w-full"
              [src]="info().mapEmbedUrl | safeUrl"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
        </aside>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly metaService = inject(MetaService);

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

  readonly contactForm = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
    company: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    phone: this.fb.control('', { validators: [Validators.required] }),
    topic: this.fb.control('', { validators: [Validators.required] }),
    message: this.fb.control('', { validators: [Validators.required, Validators.minLength(10)] }),
  });

  readonly topicOptions = [
    { label: 'ERP Modernization', value: 'erp' },
    { label: 'Android Development', value: 'android' },
    { label: 'Artificial Intelligence', value: 'ai' },
    { label: 'Harm Academy', value: 'academy' },
    { label: 'General Inquiry', value: 'general' },
  ];

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const payload = this.contactForm.getRawValue();
    this.contactService.submitRequest(payload).subscribe();
    this.contactForm.reset({
      name: '',
      company: '',
      email: '',
      phone: '',
      topic: '',
      message: '',
    });
  }

  constructor() {
    this.metaService.update({
      title: 'Contact Hum Tech',
      description: 'Reach the Hum Tech team to discuss ERP, mobile, AI, or Harm Academy initiatives.',
    });
  }
}
