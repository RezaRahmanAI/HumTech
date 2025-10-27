import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ServicesService } from '../../core/services/services.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs.component';
import { BadgeComponent } from '../../shared/components/badge.component';
import { AccordionComponent } from '../../shared/components/accordion.component';
import { ContactService } from '../../core/services/contact.service';
import { FaqService } from '../../core/services/faq.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent, BreadcrumbsComponent, BadgeComponent, AccordionComponent],
  template: `
    <ng-container *ngIf="service(); else loading">
      <section class="bg-secondary-50 py-12">
        <div class="section-container space-y-6">
          <app-breadcrumbs [crumbs]="breadcrumbs(service()?.title)"></app-breadcrumbs>
          <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <app-badge variant="primary">{{ service()?.title }}</app-badge>
              <h1 class="mt-4 font-heading text-4xl font-semibold text-secondary-900">{{ service()?.title }}</h1>
              <p class="mt-3 max-w-2xl text-sm text-secondary-600">{{ service()?.description }}</p>
            </div>
            <app-cta-button type="link" variant="primary" href="/contact">Book a discovery call</app-cta-button>
          </div>
        </div>
      </section>

      <section class="section-container py-16">
        <div class="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div class="space-y-8">
            <div>
              <h2 class="font-heading text-2xl font-semibold text-secondary-900">What we deliver</h2>
              <ul class="mt-4 space-y-3 text-sm text-secondary-600">
                <li *ngFor="let feature of service()?.features" class="flex items-start gap-3">
                  <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="font-heading text-2xl font-semibold text-secondary-900">Delivery methodology</h2>
              <div class="mt-4 grid gap-4 md:grid-cols-2">
                <div *ngFor="let step of service()?.process" class="rounded-2xl border border-secondary-100 bg-accent p-5">
                  <h3 class="font-heading text-base font-semibold text-secondary-900">{{ step.title }}</h3>
                  <p class="mt-2 text-sm text-secondary-600">{{ step.description }}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 class="font-heading text-2xl font-semibold text-secondary-900">Technology stack</h2>
              <div class="mt-4 flex flex-wrap gap-2">
                <span *ngFor="let tech of service()?.technologies" class="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
          <aside class="space-y-6">
            <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
              <h3 class="font-heading text-lg font-semibold text-secondary-900">Need this solution?</h3>
              <p class="mt-3 text-sm text-secondary-600">
                Connect with our strategy team to map your roadmap, integration dependencies, and success metrics.
              </p>
              <ul class="mt-4 space-y-2 text-sm text-secondary-600">
                <li *ngFor="let highlight of contactHighlights()" class="flex items-start gap-3">
                  <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>
              <app-cta-button class="mt-6 w-full justify-center" type="link" variant="primary" href="/contact">Talk to us</app-cta-button>
            </div>
            <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
              <h3 class="font-heading text-lg font-semibold text-secondary-900">Frequently asked questions</h3>
              <app-accordion class="mt-4" [items]="faqItems()"></app-accordion>
            </div>
          </aside>
        </div>
      </section>

      <section class="bg-secondary-50 py-16">
        <div class="section-container">
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Case studies</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <article *ngFor="let study of service()?.caseStudies" class="rounded-3xl border border-secondary-100 bg-accent p-6">
              <h3 class="font-heading text-lg font-semibold text-secondary-900">{{ study.client }}</h3>
              <p class="mt-2 text-sm text-secondary-600">{{ study.summary }}</p>
              <p class="mt-2 text-sm font-semibold text-secondary-700">Impact: {{ study.impact }}</p>
              <app-cta-button class="mt-4" type="link" variant="ghost" [href]="study.link">View project</app-cta-button>
            </article>
          </div>
        </div>
      </section>
    </ng-container>

    <ng-template #loading>
      <section class="section-container py-20">
        <p class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">Loading service details...</p>
      </section>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly servicesService = inject(ServicesService);
  private readonly contactService = inject(ContactService);
  private readonly faqService = inject(FaqService);

  readonly service = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.servicesService.getById(params.get('id') ?? ''))
    ),
    { initialValue: undefined }
  );

  private readonly contactInfo = toSignal(this.contactService.getContactInformation(), {
    initialValue: {
      address: '',
      phone: '',
      email: '',
      social: [],
      mapEmbedUrl: '',
      officeHours: '',
    },
  });

  private readonly faqItemsSignal = toSignal(this.faqService.getAll(), { initialValue: [] });

  readonly contactHighlights = computed(() => [
    'Expert squads aligned to your KPIs',
    'Migration playbooks and success metrics',
    `Talk with us at ${this.contactInfo().email}`,
  ]);

  readonly faqItems = computed(() =>
    this.faqItemsSignal()
      .filter((faq) => faq.category === 'Technology')
      .map((faq) => ({ id: faq.id, title: faq.question, content: faq.answer }))
  );

  breadcrumbs(title?: string) {
    return [
      { label: 'Home', path: '/' },
      { label: 'Services', path: '/services' },
      { label: title ?? 'Detail' },
    ];
  }
}
