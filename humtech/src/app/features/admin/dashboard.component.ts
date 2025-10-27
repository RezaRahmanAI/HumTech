import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatsService } from '../../core/services/stats.service';
import { ServicesService } from '../../core/services/services.service';
import { JobsService } from '../../core/services/jobs.service';
import { BlogService } from '../../core/services/blog.service';
import { TeamService } from '../../core/services/team.service';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { CoursesService } from '../../core/services/courses.service';
import { FaqService } from '../../core/services/faq.service';
import { ContactService } from '../../core/services/contact.service';

interface SummaryCard {
  title: string;
  description: string;
  route: string;
  count: number;
}

interface ManagementArea {
  title: string;
  description: string;
  route: string;
  countLabel?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="space-y-10">
      <header class="space-y-2">
        <h1 class="font-heading text-3xl font-semibold text-secondary-900">Operations Command Center</h1>
        <p class="max-w-3xl text-sm text-secondary-600">
          Monitor mission-critical content modules, jump into updates, and keep Hum Tech’s digital experience aligned with the
          latest strategy.
        </p>
      </header>

      <section aria-label="Content inventory snapshot" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article
          *ngFor="let card of summaryCards()"
          class="flex flex-col justify-between rounded-3xl border border-secondary-100 bg-accent p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-secondary-500">{{ card.description }}</p>
            <p class="mt-3 text-4xl font-semibold text-secondary-900">{{ card.count }}</p>
          </div>
          <a
            [routerLink]="card.route"
            class="mt-6 inline-flex items-center justify-between rounded-2xl bg-secondary-50 px-4 py-3 text-sm font-semibold text-secondary-700 transition hover:bg-primary hover:text-accent"
            >Manage {{ card.title }}</a
          >
        </article>
      </section>

      <div class="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section aria-label="Management areas" class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 class="font-heading text-2xl font-semibold text-secondary-900">Content management hub</h2>
              <p class="text-sm text-secondary-600">Every component of the public site is one click away.</p>
            </div>
            <a
              routerLink="/admin/settings"
              class="inline-flex items-center rounded-full border border-secondary-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-secondary-600 transition hover:border-primary hover:text-primary"
              >Global settings</a
            >
          </div>

          <div class="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            <article
              *ngFor="let area of managementAreas()"
              class="flex h-full flex-col justify-between rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 class="font-heading text-lg font-semibold text-secondary-900">{{ area.title }}</h3>
                <p class="mt-2 text-sm text-secondary-600">{{ area.description }}</p>
              </div>
              <div class="mt-6 flex items-center justify-between text-xs text-secondary-500">
                <span *ngIf="area.countLabel" class="rounded-full bg-secondary-50 px-3 py-1 font-medium text-secondary-600">
                  {{ area.countLabel }}
                </span>
                <a
                  [routerLink]="area.route"
                  class="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-600"
                >
                  Manage
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-6">
          <section class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm">
            <h2 class="font-heading text-lg font-semibold text-secondary-900">Latest activity</h2>
            <div class="mt-4 space-y-4 text-sm">
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-wide text-secondary-500">Newest blog insights</h3>
                <ul class="mt-2 space-y-2 text-secondary-700">
                  <li *ngFor="let article of latestArticles()">{{ article.title }}</li>
                </ul>
              </div>
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-wide text-secondary-500">Active hiring</h3>
                <ul class="mt-2 space-y-2 text-secondary-700">
                  <li *ngFor="let job of latestJobs()">{{ job.title }} · {{ job.location }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm text-sm text-secondary-600">
            <h2 class="font-heading text-lg font-semibold text-secondary-900">Contact quick view</h2>
            <p class="mt-3">{{ contact().email }}</p>
            <p class="mt-1">{{ contact().phone }}</p>
            <p class="mt-1">{{ contact().officeHours }}</p>
          </section>
        </aside>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  private readonly statsService = inject(StatsService);
  private readonly servicesService = inject(ServicesService);
  private readonly jobsService = inject(JobsService);
  private readonly blogService = inject(BlogService);
  private readonly teamService = inject(TeamService);
  private readonly testimonialsService = inject(TestimonialsService);
  private readonly coursesService = inject(CoursesService);
  private readonly faqService = inject(FaqService);
  private readonly contactService = inject(ContactService);

  readonly stats = toSignal(this.statsService.getAll(), { initialValue: [] });
  readonly services = toSignal(this.servicesService.getAll(), { initialValue: [] });
  readonly jobs = toSignal(this.jobsService.getAll(), { initialValue: [] });
  readonly articles = toSignal(this.blogService.getAll(), { initialValue: [] });
  readonly team = toSignal(this.teamService.getAll(), { initialValue: [] });
  readonly testimonials = toSignal(this.testimonialsService.getAll(), { initialValue: [] });
  readonly courses = toSignal(this.coursesService.getCourses(), { initialValue: [] });
  readonly faqs = toSignal(this.faqService.getAll(), { initialValue: [] });
  readonly contact = toSignal(this.contactService.getContactInformation(), {
    initialValue: {
      address: '',
      phone: '',
      email: '',
      social: [],
      mapEmbedUrl: '',
      officeHours: '',
    },
  });

  readonly summaryCards = computed<SummaryCard[]>(() => [
    {
      title: 'Services',
      description: 'Service catalog',
      route: '/admin/services',
      count: this.services().length,
    },
    {
      title: 'Team',
      description: 'Leaders & experts',
      route: '/admin/team',
      count: this.team().length,
    },
    {
      title: 'Job postings',
      description: 'Talent pipeline',
      route: '/admin/jobs',
      count: this.jobs().length,
    },
    {
      title: 'Blog stories',
      description: 'Thought leadership',
      route: '/admin/blog',
      count: this.articles().length,
    },
    {
      title: 'Testimonials',
      description: 'Client advocacy',
      route: '/admin/testimonials',
      count: this.testimonials().length,
    },
    {
      title: 'Academy courses',
      description: 'Harm Academy',
      route: '/admin/courses',
      count: this.courses().length,
    },
  ]);

  readonly managementAreas = computed<ManagementArea[]>(() => [
    {
      title: 'Homepage & stats',
      description: 'Update hero messaging, CTAs, and impact metrics.',
      route: '/admin/content',
      countLabel: `${this.stats().length} metrics`,
    },
    {
      title: 'Service catalog',
      description: 'Curate ERP, Android, AI, and Harm Academy offerings.',
      route: '/admin/services',
      countLabel: `${this.services().length} services`,
    },
    {
      title: 'Team directory',
      description: 'Highlight leadership, experts, and delivery squads.',
      route: '/admin/team',
      countLabel: `${this.team().length} members`,
    },
    {
      title: 'Client testimonials',
      description: 'Showcase proof points and market credibility.',
      route: '/admin/testimonials',
      countLabel: `${this.testimonials().length} quotes`,
    },
    {
      title: 'Careers portal',
      description: 'Manage openings, hiring stages, and job details.',
      route: '/admin/jobs',
      countLabel: `${this.jobs().length} roles`,
    },
    {
      title: 'Blog & news',
      description: 'Publish insights, company updates, and product launches.',
      route: '/admin/blog',
      countLabel: `${this.articles().length} articles`,
    },
    {
      title: 'Harm Academy',
      description: 'Launch new programs, instructors, and success stories.',
      route: '/admin/courses',
      countLabel: `${this.courses().length} courses`,
    },
    {
      title: 'Knowledge base',
      description: 'Keep FAQs aligned to sales, support, and onboarding needs.',
      route: '/admin/faq',
      countLabel: `${this.faqs().length} entries`,
    },
    {
      title: 'Company settings',
      description: 'Maintain contact channels, addresses, and social presence.',
      route: '/admin/settings',
    },
  ]);

  readonly latestArticles = computed(() => this.articles().slice(0, 3));
  readonly latestJobs = computed(() => this.jobs().slice(0, 3));
}
