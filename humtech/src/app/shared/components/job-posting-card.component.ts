import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { JobPosting } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { CtaButtonComponent } from './cta-button.component';

@Component({
  selector: 'app-job-posting-card',
  standalone: true,
  imports: [CommonModule, DatePipe, ScrollRevealDirective, CtaButtonComponent],
  template: `
    <article appScrollReveal class="flex h-full flex-col gap-4 rounded-3xl border border-secondary-100 bg-accent p-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h3 class="font-heading text-lg font-semibold text-secondary-900">{{ job.title }}</h3>
          <p class="text-sm text-primary">{{ job.department }} • {{ job.type }}</p>
        </div>
        <span class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {{ job.experienceLevel }}
        </span>
      </div>
      <p class="text-sm text-secondary-600">{{ job.description }}</p>
      <ul class="space-y-2 text-sm text-secondary-600">
        <li *ngFor="let requirement of job.requirements" class="flex items-start gap-2">
          <span class="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
          <span>{{ requirement }}</span>
        </li>
      </ul>
      <div class="mt-auto flex items-center justify-between text-xs text-secondary-500">
        <span>{{ job.location }}</span>
        <span>Posted {{ job.postedDate | date: 'mediumDate' }}</span>
      </div>
      <div class="flex gap-3">
        <app-cta-button variant="primary" type="link" [href]="'/careers/' + job.id">View role</app-cta-button>
        <app-cta-button variant="ghost" (click)="apply.emit(job.id)">Apply now</app-cta-button>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobPostingCardComponent {
  @Input({ required: true }) job!: JobPosting;
  @Output() apply = new EventEmitter<string>();
}
