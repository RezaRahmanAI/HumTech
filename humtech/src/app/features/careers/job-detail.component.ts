import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { JobsService } from '../../core/services/jobs.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs.component';
import { BadgeComponent } from '../../shared/components/badge.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CtaButtonComponent, BreadcrumbsComponent, BadgeComponent],
  template: `
    <ng-container *ngIf="job(); else loading">
      <section class="bg-secondary-50 py-12">
        <div class="section-container space-y-6">
          <app-breadcrumbs [crumbs]="[
            { label: 'Home', path: '/' },
            { label: 'Careers', path: '/careers' },
            { label: job()?.title ?? 'Role' }
          ]"></app-breadcrumbs>
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <app-badge variant="primary">{{ job()?.department }}</app-badge>
              <h1 class="mt-4 font-heading text-4xl font-semibold text-secondary-900">{{ job()?.title }}</h1>
              <p class="text-sm text-secondary-600">{{ job()?.location }} • {{ job()?.type }}</p>
            </div>
            <app-cta-button type="link" variant="primary" href="/contact">Apply now</app-cta-button>
          </div>
        </div>
      </section>

      <section class="section-container py-16">
        <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div class="space-y-8">
            <div>
              <h2 class="font-heading text-2xl font-semibold text-secondary-900">About the role</h2>
              <p class="mt-3 text-sm text-secondary-600">{{ job()?.description }}</p>
            </div>
            <div>
              <h2 class="font-heading text-2xl font-semibold text-secondary-900">Requirements</h2>
              <ul class="mt-4 space-y-2 text-sm text-secondary-600">
                <li *ngFor="let requirement of job()?.requirements" class="flex items-start gap-3">
                  <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  <span>{{ requirement }}</span>
                </li>
              </ul>
            </div>
          </div>
          <aside class="space-y-4">
            <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
              <h3 class="font-heading text-lg font-semibold text-secondary-900">Role details</h3>
              <ul class="mt-4 space-y-2 text-sm text-secondary-600">
                <li><strong>Department:</strong> {{ job()?.department }}</li>
                <li><strong>Experience level:</strong> {{ job()?.experienceLevel }}</li>
                <li><strong>Location:</strong> {{ job()?.location }}</li>
                <li><strong>Posted:</strong> {{ job()?.postedDate | date: 'mediumDate' }}</li>
              </ul>
            </div>
            <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
              <h3 class="font-heading text-lg font-semibold text-secondary-900">Not the right role?</h3>
              <p class="mt-3 text-sm text-secondary-600">We’re always meeting new talent. Share your profile and we will reach out when a match appears.</p>
              <app-cta-button class="mt-4" type="link" variant="ghost" href="/contact">Send introduction</app-cta-button>
            </div>
          </aside>
        </div>
      </section>
    </ng-container>

    <ng-template #loading>
      <section class="section-container py-20">
        <p class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">Loading job...</p>
      </section>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly jobsService = inject(JobsService);

  readonly job = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.jobsService.getById(params.get('id') ?? ''))
    ),
    { initialValue: undefined }
  );
}
