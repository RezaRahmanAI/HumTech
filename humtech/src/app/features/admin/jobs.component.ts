import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobsService } from '../../core/services/jobs.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-jobs',
  standalone: true,
  imports: [CommonModule, DatePipe, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Job postings</h2>
          <p class="text-sm text-secondary-600">Manage open roles and recruiting pipeline.</p>
        </div>
        <app-cta-button variant="primary" type="button">Add role</app-cta-button>
      </div>
      <div class="overflow-hidden rounded-3xl border border-secondary-100">
        <table class="min-w-full divide-y divide-secondary-100 text-sm">
          <thead class="bg-secondary-50 text-secondary-500">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Title</th>
              <th class="px-4 py-3 text-left font-semibold">Department</th>
              <th class="px-4 py-3 text-left font-semibold">Location</th>
              <th class="px-4 py-3 text-left font-semibold">Posted</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-100 bg-accent">
            <tr *ngFor="let job of jobs()" class="text-secondary-700">
              <td class="px-4 py-3 font-medium text-secondary-900">{{ job.title }}</td>
              <td class="px-4 py-3">{{ job.department }}</td>
              <td class="px-4 py-3">{{ job.location }}</td>
              <td class="px-4 py-3">{{ job.postedDate | date: 'mediumDate' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminJobsComponent {
  private readonly jobsService = inject(JobsService);
  readonly jobs = toSignal(this.jobsService.getAll(), { initialValue: [] });
}
