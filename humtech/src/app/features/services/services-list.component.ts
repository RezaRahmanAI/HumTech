import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ServicesService } from '../../core/services/services.service';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar.component';
import { FilterPanelComponent, FilterOption } from '../../shared/components/filter-panel.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs.component';
import { BadgeComponent } from '../../shared/components/badge.component';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, SearchBarComponent, FilterPanelComponent, BreadcrumbsComponent, BadgeComponent],
  template: `
    <section class="bg-secondary-50 py-12">
      <div class="section-container space-y-6">
        <app-breadcrumbs [crumbs]="breadcrumbs"></app-breadcrumbs>
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <app-badge variant="primary">Service Portfolio</app-badge>
            <h1 class="mt-4 font-heading text-4xl font-semibold text-secondary-900">Services</h1>
            <p class="mt-3 max-w-2xl text-sm text-secondary-600">
              Explore our product engineering, AI, and learning enablement capabilities. Every engagement is modular, API-first, and ready for enterprise integration.
            </p>
          </div>
          <app-search-bar
            class="w-full max-w-sm"
            [value]="search()"
            placeholder="Search services..."
            (valueChange)="updateSearch($event)"
            (clear)="updateSearch('')"
          ></app-search-bar>
        </div>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-8 lg:grid-cols-[280px_1fr]">
        <app-filter-panel
          [categories]="categoryOptions"
          [tags]="technologyOptions"
          [selectedCategory]="selectedCategory()"
          [selectedTags]="selectedTags()"
          (categoryChange)="selectCategory($event)"
          (tagsChange)="selectTags($event)"
          (reset)="resetFilters()"
        ></app-filter-panel>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <app-service-card *ngFor="let service of filteredServices()" [service]="service"></app-service-card>
          <p *ngIf="!filteredServices().length" class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">
            No services match your filters. Try adjusting the search keywords or filters.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent {
  private readonly servicesService = inject(ServicesService);

  readonly services = toSignal(this.servicesService.getAll(), { initialValue: [] });
  readonly search = signal('');
  readonly selectedCategory = signal<string | null>(null);
  readonly selectedTags = signal<string[]>([]);

  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Services' },
  ];

  get categoryOptions(): FilterOption[] {
    return this.services().map((service) => ({ label: service.title, value: service.id }));
  }

  get technologyOptions(): FilterOption[] {
    const technologies = new Set<string>();
    this.services().forEach((service) => service.technologies.forEach((tech) => technologies.add(tech)));
    return Array.from(technologies).map((tech) => ({ label: tech, value: tech }));
  }

  readonly filteredServices = signal(this.services());

  constructor() {
    effect(() => {
      this.filteredServices.set(this.services());
    });
  }

  updateSearch(value: string): void {
    this.search.set(value);
    this.filter();
  }

  selectCategory(category: string | null): void {
    this.selectedCategory.set(category === this.selectedCategory() ? null : category);
    this.filter();
  }

  selectTags(tags: string[]): void {
    this.selectedTags.set(tags);
    this.filter();
  }

  resetFilters(): void {
    this.search.set('');
    this.selectedCategory.set(null);
    this.selectedTags.set([]);
    this.filter();
  }

  private filter(): void {
    const searchTerm = this.search().toLowerCase();
    const category = this.selectedCategory();
    const tags = new Set(this.selectedTags());

    const result = this.services().filter((service) => {
      const matchesSearch =
        !searchTerm ||
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm);
      const matchesCategory = !category || service.id === category;
      const matchesTags = !tags.size || service.technologies.some((tech) => tags.has(tech));
      return matchesSearch && matchesCategory && matchesTags;
    });

    this.filteredServices.set(result);
  }
}
