import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatsService } from '../../core/services/stats.service';
import { ServicesService } from '../../core/services/services.service';
import { JobsService } from '../../core/services/jobs.service';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <div>
        <h1 class="font-heading text-2xl font-semibold text-secondary-900">Dashboard</h1>
        <p class="text-sm text-secondary-600">Snapshot of platform metrics and content inventory.</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-2xl border border-secondary-100 bg-accent p-4">
          <p class="text-xs uppercase tracking-wide text-secondary-500">Services</p>
          <p class="text-2xl font-semibold text-secondary-900">{{ services().length }}</p>
        </div>
        <div class="rounded-2xl border border-secondary-100 bg-accent p-4">
          <p class="text-xs uppercase tracking-wide text-secondary-500">Job postings</p>
          <p class="text-2xl font-semibold text-secondary-900">{{ jobs().length }}</p>
        </div>
        <div class="rounded-2xl border border-secondary-100 bg-accent p-4">
          <p class="text-xs uppercase tracking-wide text-secondary-500">Blog articles</p>
          <p class="text-2xl font-semibold text-secondary-900">{{ articles().length }}</p>
        </div>
        <div class="rounded-2xl border border-secondary-100 bg-accent p-4">
          <p class="text-xs uppercase tracking-wide text-secondary-500">Impact metrics</p>
          <p class="text-2xl font-semibold text-secondary-900">{{ stats().length }}</p>
        </div>
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

  readonly stats = toSignal(this.statsService.getAll(), { initialValue: [] });
  readonly services = toSignal(this.servicesService.getAll(), { initialValue: [] });
  readonly jobs = toSignal(this.jobsService.getAll(), { initialValue: [] });
  readonly articles = toSignal(this.blogService.getAll(), { initialValue: [] });
}
