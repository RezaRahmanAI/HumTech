import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroService } from '../../core/services/hero.service';
import { ServicesService } from '../../core/services/services.service';
import { StatsService } from '../../core/services/stats.service';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { BlogService } from '../../core/services/blog.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { StatsCounterComponent } from '../../shared/components/stats-counter.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card.component';
import { BadgeComponent } from '../../shared/components/badge.component';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    CtaButtonComponent,
    ServiceCardComponent,
    StatsCounterComponent,
    TestimonialCardComponent,
    BlogCardComponent,
    BadgeComponent,
  ],
  template: `
    <section
      class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-accent to-secondary-50"
    >
      <div class="section-container grid gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <span>Trusted by global innovators</span>
          </div>
          <h1 class="font-heading text-4xl font-bold leading-tight text-secondary-900 md:text-5xl">
            {{ hero().title }}
          </h1>
          <p class="max-w-2xl text-base text-secondary-600">
            {{ hero().subtitle }}
          </p>
          <ul class="grid gap-2 text-sm text-secondary-600 md:grid-cols-2">
            <li *ngFor="let highlight of hero().highlights" class="flex items-center gap-2">
              <span class="inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
          <div class="flex flex-wrap gap-4">
            <app-cta-button type="link" variant="primary" [href]="hero().ctaLink">{{ hero().ctaLabel }}</app-cta-button>
            <app-cta-button
              *ngIf="hero().secondaryCtaLabel && hero().secondaryCtaLink"
              type="link"
              variant="ghost"
              [href]="hero().secondaryCtaLink"
            >
              {{ hero().secondaryCtaLabel }}
            </app-cta-button>
          </div>
        </div>
        <div class="relative ml-auto hidden h-full w-full max-w-lg rounded-3xl bg-primary-500/10 p-4 lg:flex">
          <div class="relative flex-1 overflow-hidden rounded-3xl bg-accent shadow-xl">
            <img
              [src]="hero().backgroundImage"
              alt="Hum Tech hero"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section-container py-20">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-primary">Our capabilities</p>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Engineering outcomes at scale</h2>
        </div>
        <p class="max-w-xl text-sm text-secondary-600">
          We design future-ready platforms using composable architecture, human-centered design, and AI acceleration to drive measurable outcomes across your business.
        </p>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <app-service-card *ngFor="let service of services()" [service]="service"></app-service-card>
      </div>
    </section>

    <section class="bg-secondary-50 py-20">
      <div class="section-container">
        <div class="flex flex-col gap-4 text-center">
          <p class="text-xs font-semibold uppercase tracking-wide text-primary">Proven results</p>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Impact in every engagement</h2>
        </div>
        <div class="mt-12">
          <app-stats-counter [stats]="stats()"></app-stats-counter>
        </div>
      </div>
    </section>

    <section class="section-container py-20">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-primary">Voices from partners</p>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Client testimonials</h2>
        </div>
        <p class="max-w-xl text-sm text-secondary-600">
          Our delivery model emphasizes partnership, transparency, and velocity. Hear from leaders who have scaled with Hum Tech.
        </p>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <app-testimonial-card *ngFor="let testimonial of testimonials()" [testimonial]="testimonial"></app-testimonial-card>
      </div>
    </section>

    <section class="bg-secondary-50 py-20">
      <div class="section-container">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-primary">Insights</p>
            <h2 class="font-heading text-3xl font-semibold text-secondary-900">Latest thinking</h2>
          </div>
          <app-cta-button type="link" variant="ghost" href="/blog">View all articles</app-cta-button>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <app-blog-card *ngFor="let article of articles()" [article]="article"></app-blog-card>
        </div>
      </div>
    </section>

    <section class="section-container py-20">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div class="space-y-5">
          <app-badge variant="neutral">Ready to build the future?</app-badge>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Let’s co-create your next digital advantage.</h2>
          <p class="text-sm text-secondary-600">
            Whether you are modernizing ERP, launching a mobile product, or operationalizing AI, Hum Tech assembles cross-functional squads aligned to business outcomes.
          </p>
          <div class="flex flex-wrap gap-4">
            <app-cta-button type="link" variant="primary" href="/contact">Start a project</app-cta-button>
            <app-cta-button type="link" variant="ghost" href="/harm-academy">Join Harm Academy</app-cta-button>
          </div>
        </div>
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-lg">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Featured Highlights</h3>
          <ul class="mt-4 space-y-3 text-sm text-secondary-600">
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>API-first architecture ready for ASP.NET Core integration.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>Enterprise security posture with interceptors and observability baked in.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>Immersive GSAP animations and responsive design tuned for performance.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly heroService = inject(HeroService);
  private readonly servicesService = inject(ServicesService);
  private readonly statsService = inject(StatsService);
  private readonly testimonialsService = inject(TestimonialsService);
  private readonly blogService = inject(BlogService);
  private readonly metaService = inject(MetaService);

  readonly hero = toSignal(this.heroService.getHero(), {
    initialValue: {
      id: '',
      title: '',
      subtitle: '',
      ctaLabel: '',
      ctaLink: '/',
      backgroundImage: '',
      secondaryCtaLabel: '',
      secondaryCtaLink: '',
      highlights: [],
    },
  });
  readonly services = toSignal(this.servicesService.getAll(), { initialValue: [] });
  readonly stats = toSignal(this.statsService.getAll(), { initialValue: [] });
  readonly testimonials = toSignal(this.testimonialsService.getAll(), { initialValue: [] });
  readonly articles = toSignal(this.blogService.getAll(), { initialValue: [] });

  constructor() {
    this.metaService.update({
      title: 'Enterprise Technology Partner',
      description:
        'Hum Tech delivers ERP modernization, Android applications, AI initiatives, and talent enablement through Harm Academy.',
    });
  }
}
