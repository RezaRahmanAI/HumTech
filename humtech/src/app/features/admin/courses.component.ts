import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CoursesService } from '../../core/services/courses.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Harm Academy programs</h2>
          <p class="text-sm text-secondary-600">
            Manage course catalog, featured instructors, and student proof points powering Harm Academy.
          </p>
        </div>
        <app-cta-button variant="primary" type="button">Add course</app-cta-button>
      </div>

      <div class="space-y-6">
        <article class="overflow-hidden rounded-3xl border border-secondary-100">
          <table class="min-w-full divide-y divide-secondary-100 text-sm">
            <thead class="bg-secondary-50 text-secondary-500">
              <tr>
                <th class="px-4 py-3 text-left font-semibold">Title</th>
                <th class="px-4 py-3 text-left font-semibold">Category</th>
                <th class="px-4 py-3 text-left font-semibold">Level</th>
                <th class="px-4 py-3 text-left font-semibold">Price</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-secondary-100 bg-accent text-secondary-700">
              <tr *ngFor="let course of courses()">
                <td class="px-4 py-3 font-medium text-secondary-900">{{ course.title }}</td>
                <td class="px-4 py-3">{{ course.category }}</td>
                <td class="px-4 py-3">{{ course.level }}</td>
                <td class="px-4 py-3">{{ course.price | currency: 'USD':'symbol':'1.0-0' }}</td>
              </tr>
            </tbody>
          </table>
        </article>

        <div class="grid gap-6 lg:grid-cols-2">
          <article class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm">
            <h3 class="font-heading text-lg font-semibold text-secondary-900">Instructor roster</h3>
            <p class="mt-2 text-sm text-secondary-600">{{ instructors().length }} active mentors</p>
            <ul class="mt-4 space-y-3 text-sm text-secondary-700">
              <li *ngFor="let instructor of instructors()">
                <p class="font-semibold text-secondary-900">{{ instructor.name }}</p>
                <p class="text-xs text-secondary-500">{{ instructor.expertise.join(', ') }}</p>
              </li>
            </ul>
          </article>

          <article class="rounded-3xl border border-secondary-100 bg-accent p-6 shadow-sm">
            <h3 class="font-heading text-lg font-semibold text-secondary-900">Learner testimonials</h3>
            <p class="mt-2 text-sm text-secondary-600">{{ testimonials().length }} stories published</p>
            <ul class="mt-4 space-y-3 text-sm text-secondary-700">
              <li *ngFor="let testimonial of testimonials()">
                <p class="font-semibold text-secondary-900">{{ testimonial.studentName }}</p>
                <p class="text-xs text-secondary-500">{{ testimonial.role }}</p>
                <p class="mt-1 text-secondary-600">“{{ testimonial.feedback }}”</p>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCoursesComponent {
  private readonly coursesService = inject(CoursesService);

  readonly courses = toSignal(this.coursesService.getCourses(), { initialValue: [] });
  readonly instructors = toSignal(this.coursesService.getInstructors(), { initialValue: [] });
  readonly testimonials = toSignal(this.coursesService.getTestimonials(), { initialValue: [] });
}
