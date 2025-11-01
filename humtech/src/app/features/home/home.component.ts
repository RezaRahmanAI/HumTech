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
    <section class="relative overflow-hidden bg-secondary-950 text-accent">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl"></div>
        <div class="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary-300/30 blur-3xl"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.15),transparent_55%)]"></div>
      </div>
      <div class="section-container relative z-10 grid gap-12 py-24 lg:grid-cols-[1.15fr_minmax(0,1fr)] lg:items-center">
        <div class="space-y-10">
          <app-badge variant="neutral">Trusted technology partner</app-badge>
          <h1 class="font-heading text-4xl font-bold leading-tight md:text-6xl">
            <span class="heading-gradient">{{ hero().title }}</span>
          </h1>
          <p class="max-w-2xl text-base leading-relaxed text-accent/80">
            {{ hero().subtitle }}
          </p>
          <div class="flex flex-wrap gap-3">
            <span
              *ngFor="let highlight of hero().highlights"
              class="inline-flex items-center gap-2 rounded-full bg-secondary-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent/80"
            >
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
              {{ highlight }}
            </span>
          </div>
          <div class="flex flex-wrap items-center gap-4">
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
          <div class="grid gap-6 pt-6 text-accent/70 sm:grid-cols-2">
            <div *ngFor="let stat of (stats() | slice:0:2)" class="rounded-3xl border border-secondary-700/60 bg-secondary-900/40 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-accent/50">{{ stat.label }}</p>
              <p class="mt-2 font-heading text-3xl font-semibold text-white">
                {{ stat.value }}{{ stat.suffix }}
              </p>
            </div>
          </div>
        </div>
        <div class="relative hidden lg:block">
          <div class="absolute -top-6 -left-6 h-24 w-24 rounded-3xl border border-primary-400/40"></div>
          <div class="relative overflow-hidden rounded-[40px] border border-secondary-700/60 bg-secondary-900/40 p-6 shadow-2xl shadow-secondary-900/50 backdrop-blur">
            <img
              [src]="hero().backgroundImage"
              alt="Hum Tech hero"
              class="h-96 w-full rounded-[28px] object-cover"
              loading="lazy"
            />
            <div class="mt-6 space-y-3 text-sm text-accent/70">
              <div class="flex items-center gap-3">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/40">24/7</span>
                <div>
                  <p class="text-xs uppercase tracking-[0.3em] text-accent/60">Delivery model</p>
                  <p class="font-heading text-base text-white">Follow-the-sun collaboration</p>
                </div>
              </div>
              <div class="rounded-2xl border border-secondary-700/60 bg-secondary-900/50 p-4">
                <p class="text-xs uppercase tracking-[0.3em] text-accent/60">Enterprise stack</p>
                <p class="mt-2 text-sm leading-relaxed">
                  Cloud-native engineering squads orchestrated across Europe, Japan, and North America.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-accent py-24">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),transparent_60%)]"></div>
      <div class="section-container relative z-10">
        <div class="flex flex-col gap-6 text-center">
          <app-badge variant="primary">Our capabilities</app-badge>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900 md:text-4xl">Engineering outcomes at scale</h2>
          <p class="mx-auto max-w-2xl text-sm leading-relaxed text-secondary-600">
            From ERP modernization to AI-led customer experiences, our hybrid squads combine strategy, design, and engineering to ship measurable transformation faster.
          </p>
        </div>
        <div class="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <app-service-card *ngFor="let service of services()" [service]="service"></app-service-card>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-800 py-24 text-accent">
      <div class="section-container relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-xl space-y-5">
          <app-badge variant="neutral">Impact in motion</app-badge>
          <h2 class="font-heading text-3xl font-semibold md:text-4xl">Metrics that reflect enterprise confidence</h2>
          <p class="text-sm leading-relaxed text-accent/70">
            Our interdisciplinary teams anchor every engagement with transparent delivery rituals, composable architecture, and automation-first operations.
          </p>
          <div class="flex flex-wrap gap-3">
            <app-cta-button type="link" variant="secondary" href="/services">View delivery playbook</app-cta-button>
            <app-cta-button type="link" variant="ghost" href="/about">Meet our leadership</app-cta-button>
          </div>
        </div>
        <div class="flex-1">
          <app-stats-counter [stats]="stats()"></app-stats-counter>
        </div>
      </div>
    </section>

    <section class="relative bg-accent py-24">
      <div class="section-container">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <app-badge variant="primary">Client stories</app-badge>
            <h2 class="font-heading text-3xl font-semibold text-secondary-900 md:text-4xl">Global leaders scaling with Hum Tech</h2>
          </div>
          <p class="max-w-xl text-sm leading-relaxed text-secondary-600">
            Hear how enterprises leverage our product studios, nearshore centers, and Harm Academy to accelerate mission-critical platforms.
          </p>
        </div>
        <div class="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <app-testimonial-card *ngFor="let testimonial of testimonials()" [testimonial]="testimonial"></app-testimonial-card>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-secondary-900 py-24 text-accent">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),transparent_60%)]"></div>
      <div class="section-container relative z-10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <app-badge variant="neutral">Insights</app-badge>
            <h2 class="font-heading text-3xl font-semibold md:text-4xl">Latest thinking from our builders</h2>
          </div>
          <app-cta-button type="link" variant="ghost" href="/blog">View all articles</app-cta-button>
        </div>
        <div class="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <app-blog-card *ngFor="let article of articles()" [article]="article"></app-blog-card>
        </div>
      </div>
    </section>

    <section class="section-container py-24">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_minmax(0,1fr)] lg:items-center">
        <div class="space-y-6">
          <app-badge variant="primary">Ready to build?</app-badge>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900 md:text-4xl">Co-create your next strategic advantage with Hum Tech.</h2>
          <p class="max-w-xl text-sm leading-relaxed text-secondary-600">
            Whether modernizing ERP, shipping mobile-first experiences, or orchestrating AI copilots, our squads embed alongside your teams to accelerate value realization.
          </p>
          <div class="flex flex-wrap gap-4">
            <app-cta-button type="link" variant="primary" href="/contact">Start a project</app-cta-button>
            <app-cta-button type="link" variant="ghost" href="/harm-academy">Join Harm Academy</app-cta-button>
          </div>
        </div>
        <div class="rounded-[32px] border border-secondary-100 bg-white/80 p-8 shadow-xl shadow-secondary-900/10 backdrop-blur">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Why partners choose Hum Tech</h3>
          <ul class="mt-6 space-y-4 text-sm leading-relaxed text-secondary-600">
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Composable architecture blueprints grounded in security and observability.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Global delivery pods synchronized through transparent rituals and SLAs.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Harm Academy enables rapid talent upskilling across product, engineering, and AI.</span>
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
