import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CoursesService } from '../../core/services/courses.service';
import { BadgeComponent } from '../../shared/components/badge.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { TabsComponent, TabItem } from '../../shared/components/tabs.component';
import { AccordionComponent } from '../../shared/components/accordion.component';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-academy-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, BadgeComponent, CtaButtonComponent, TabsComponent, AccordionComponent],
  template: `
    <section class="bg-secondary-50 py-12">
      <div class="section-container space-y-6">
        <app-badge variant="primary">Harm Academy</app-badge>
        <h1 class="font-heading text-4xl font-semibold text-secondary-900">Transform talent through immersive tech and sales programs</h1>
        <p class="max-w-3xl text-sm text-secondary-600">
          Harm Academy blends instructor-led sessions, labs, mentorship, and placement support to cultivate job-ready professionals.
        </p>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Programs</h2>
          <p class="max-w-2xl text-sm text-secondary-600">Choose from intensives focused on engineering, AI strategy, and revenue leadership.</p>
        </div>
        <app-tabs [tabs]="categoryTabs" [activeTab]="activeCategory()" (select)="selectCategory($event)"></app-tabs>
      </div>
      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article *ngFor="let course of filteredCourses()" class="flex h-full flex-col rounded-3xl border border-secondary-100 bg-accent p-6">
          <span class="text-xs font-semibold uppercase tracking-wide text-primary">{{ course.category }}</span>
          <h3 class="mt-3 font-heading text-xl font-semibold text-secondary-900">{{ course.title }}</h3>
          <p class="mt-3 text-sm text-secondary-600">{{ course.description }}</p>
          <ul class="mt-3 space-y-2 text-sm text-secondary-600">
            <li><strong>Level:</strong> {{ course.level }}</li>
            <li><strong>Duration:</strong> {{ course.duration }}</li>
            <li><strong>Schedule:</strong> {{ course.schedule }}</li>
          </ul>
          <div class="mt-auto flex items-center justify-between text-sm font-semibold text-secondary-700">
            <span>{{ course.price | currency: 'USD' }}</span>
            <app-badge *ngIf="course.featured" variant="primary">Featured</app-badge>
          </div>
          <app-cta-button class="mt-4" type="link" variant="ghost" href="/contact">Enroll now</app-cta-button>
        </article>
      </div>
    </section>

    <section class="bg-secondary-50 py-16">
      <div class="section-container grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Instructor leadership</h2>
          <div class="mt-8 space-y-6">
            <article *ngFor="let instructor of instructors()" class="rounded-3xl border border-secondary-100 bg-accent p-6">
              <div class="flex flex-col gap-2">
                <h3 class="font-heading text-xl font-semibold text-secondary-900">{{ instructor.name }}</h3>
                <p class="text-sm text-primary">{{ instructor.expertise.join(', ') }}</p>
              </div>
              <p class="mt-3 text-sm text-secondary-600">{{ instructor.bio }}</p>
            </article>
          </div>
        </div>
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Learner testimonials</h3>
          <div class="mt-4 space-y-4">
            <article *ngFor="let testimonial of testimonials()" class="rounded-2xl border border-secondary-100 bg-accent px-4 py-3">
              <p class="text-sm text-secondary-600">“{{ testimonial.feedback }}”</p>
              <div class="mt-2 text-xs font-semibold text-secondary-500">{{ testimonial.studentName }} • {{ testimonial.role }}</div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">What sets Harm Academy apart?</h3>
          <app-accordion class="mt-4" [items]="academyFaq"></app-accordion>
        </div>
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Ready to empower your teams?</h3>
          <p class="mt-3 text-sm text-secondary-600">Speak with our academy advisors to create custom learning plans, enterprise cohorts, and enablement blueprints.</p>
          <app-cta-button class="mt-6" type="link" variant="primary" href="/contact">Plan a cohort</app-cta-button>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyPageComponent {
  private readonly coursesService = inject(CoursesService);
  private readonly metaService = inject(MetaService);
  readonly courses = toSignal(this.coursesService.getCourses(), { initialValue: [] });
  readonly instructors = toSignal(this.coursesService.getInstructors(), { initialValue: [] });
  readonly testimonials = toSignal(this.coursesService.getTestimonials(), { initialValue: [] });

  readonly categoryTabs: TabItem[] = [
    { id: 'all', label: 'All' },
    { id: 'Technology', label: 'Technology' },
    { id: 'Artificial Intelligence', label: 'Artificial Intelligence' },
    { id: 'Revenue', label: 'Revenue' },
  ];

  readonly activeCategory = signal<'all' | string>('all');

  readonly filteredCourses = signal(this.courses());

  readonly academyFaq = [
    {
      id: 'format',
      title: 'What learning formats are included?',
      content: 'Each program blends live workshops, labs, asynchronous study, mentorship pods, and performance coaching.',
    },
    {
      id: 'placement',
      title: 'Do you offer placement support?',
      content: 'Yes, our talent advisors provide career coaching, employer showcases, and interview preparation.',
    },
    {
      id: 'custom-programs',
      title: 'Can we design custom programs?',
      content: 'We co-create curriculum aligned to your tech stack, go-to-market motions, and performance targets.',
    },
  ];

  constructor() {
    this.metaService.update({
      title: 'Harm Academy',
      description: 'Upskill teams with Harm Academy cohorts covering engineering, AI strategy, and sales enablement.',
    });
    effect(() => {
      const courses = this.courses();
      const category = this.activeCategory();
      const filtered = category === 'all' ? courses : courses.filter((course) => course.category === category);
      this.filteredCourses.set(filtered);
    });
  }

  selectCategory(categoryId: string): void {
    this.activeCategory.set(categoryId as 'all' | string);
  }
}
