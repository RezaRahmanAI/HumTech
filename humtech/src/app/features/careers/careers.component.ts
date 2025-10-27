import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobsService } from '../../core/services/jobs.service';
import { JobPostingCardComponent } from '../../shared/components/job-posting-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar.component';
import { FilterPanelComponent, FilterOption } from '../../shared/components/filter-panel.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { ModalComponent } from '../../shared/components/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../shared/components/form-input.component';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [
    CommonModule,
    JobPostingCardComponent,
    SearchBarComponent,
    FilterPanelComponent,
    CtaButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  template: `
    <section class="bg-secondary-50 py-12">
      <div class="section-container space-y-6">
        <h1 class="font-heading text-4xl font-semibold text-secondary-900">Join Hum Tech</h1>
        <p class="max-w-3xl text-sm text-secondary-600">
          We’re building a culture where innovators, engineers, strategists, and educators collaborate to deliver outcomes for our partners. Explore roles and shape the future with us.
        </p>
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <app-search-bar
            class="w-full max-w-sm"
            [value]="search()"
            placeholder="Search roles..."
            (valueChange)="updateSearch($event)"
            (clear)="updateSearch('')"
          ></app-search-bar>
          <app-cta-button type="link" variant="ghost" href="/contact">Introduce yourself</app-cta-button>
        </div>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-8 lg:grid-cols-[280px_1fr]">
        <app-filter-panel
          [categories]="departmentOptions"
          [tags]="locationOptions"
          [selectedCategory]="selectedDepartment()"
          [selectedTags]="selectedLocations()"
          (categoryChange)="selectDepartment($event)"
          (tagsChange)="selectLocations($event)"
          (reset)="resetFilters()"
        ></app-filter-panel>
        <div class="grid gap-6">
          <app-job-posting-card
            *ngFor="let job of filteredJobs()"
            [job]="job"
            (apply)="openApplication(job.id)"
          ></app-job-posting-card>
          <p *ngIf="!filteredJobs().length" class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">
            No roles match your filters right now. We would still love to hear from you—reach out via the contact page.
          </p>
        </div>
      </div>
    </section>

    <app-modal
      [open]="showModal()"
      title="Apply for {{ selectedJob()?.title }}"
      (close)="closeModal()"
      (confirm)="submitApplication()"
    >
      <form class="grid gap-3" [formGroup]="applicationForm">
        <app-form-input label="Full name" [control]="applicationForm.controls['name']"></app-form-input>
        <app-form-input label="Email" type="email" [control]="applicationForm.controls['email']"></app-form-input>
        <app-form-input label="Phone" type="tel" [control]="applicationForm.controls['phone']"></app-form-input>
        <app-form-input label="LinkedIn or Portfolio" [control]="applicationForm.controls['portfolioUrl']"></app-form-input>
      </form>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPageComponent {
  private readonly jobsService = inject(JobsService);
  private readonly fb = inject(FormBuilder);
  private readonly metaService = inject(MetaService);

  readonly jobs = toSignal(this.jobsService.getAll(), { initialValue: [] });
  readonly search = signal('');
  readonly selectedDepartment = signal<string | null>(null);
  readonly selectedLocations = signal<string[]>([]);
  readonly filteredJobs = signal(this.jobs());

  readonly showModal = signal(false);
  readonly selectedJobId = signal<string | null>(null);

  readonly applicationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    portfolioUrl: ['', [Validators.required]],
  });

  constructor() {
    this.metaService.update({
      title: 'Careers at Hum Tech',
      description: 'Explore opportunities to join Hum Tech’s engineering, AI, and revenue teams.',
    });
    effect(() => {
      const jobs = this.jobs();
      const searchTerm = this.search().toLowerCase();
      const department = this.selectedDepartment();
      const locations = new Set(this.selectedLocations());

      const filtered = jobs.filter((job) => {
        const matchesSearch = !searchTerm || job.title.toLowerCase().includes(searchTerm) || job.description.toLowerCase().includes(searchTerm);
        const matchesDepartment = !department || job.department === department;
        const matchesLocation = !locations.size || locations.has(job.location);
        return matchesSearch && matchesDepartment && matchesLocation;
      });

      this.filteredJobs.set(filtered);
    });
  }

  get departmentOptions(): FilterOption[] {
    const departments = new Set(this.jobs().map((job) => job.department));
    return Array.from(departments).map((department) => ({ label: department, value: department }));
  }

  get locationOptions(): FilterOption[] {
    const locations = new Set(this.jobs().map((job) => job.location));
    return Array.from(locations).map((location) => ({ label: location, value: location }));
  }

  updateSearch(value: string): void {
    this.search.set(value);
  }

  selectDepartment(department: string | null): void {
    this.selectedDepartment.set(department === this.selectedDepartment() ? null : department);
  }

  selectLocations(locations: string[]): void {
    this.selectedLocations.set(locations);
  }

  resetFilters(): void {
    this.search.set('');
    this.selectedDepartment.set(null);
    this.selectedLocations.set([]);
  }

  openApplication(jobId: string): void {
    this.selectedJobId.set(jobId);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.applicationForm.reset();
  }

  submitApplication(): void {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    console.info('Application submitted', this.applicationForm.value);
    this.closeModal();
  }

  selectedJob() {
    const jobId = this.selectedJobId();
    return this.jobs().find((job) => job.id === jobId);
  }
}
