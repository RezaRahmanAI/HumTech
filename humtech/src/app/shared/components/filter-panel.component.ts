import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="rounded-3xl border border-secondary-100 bg-accent p-6">
      <h3 class="font-heading text-base font-semibold text-secondary-900">Filters</h3>
      <div class="mt-4 space-y-4">
        <div *ngIf="categories?.length">
          <p class="text-xs font-semibold uppercase tracking-wide text-secondary-500">Categories</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-full border border-secondary-200 px-3 py-1 text-xs font-medium text-secondary-600 transition-colors hover:border-primary hover:text-primary"
              [class.bg-primary]="selectedCategory === option.value"
              [class.text-accent]="selectedCategory === option.value"
              *ngFor="let option of categories"
              (click)="categoryChange.emit(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        <div *ngIf="tags?.length">
          <p class="text-xs font-semibold uppercase tracking-wide text-secondary-500">Tags</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-full border border-secondary-200 px-3 py-1 text-xs font-medium text-secondary-600 transition-colors hover:border-primary hover:text-primary"
              [class.bg-primary-100]="selectedTags.includes(option.value)"
              [class.text-primary]="selectedTags.includes(option.value)"
              *ngFor="let option of tags"
              (click)="toggleTag(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="mt-6 w-full rounded-full border border-secondary-200 px-4 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-50"
        (click)="reset.emit()"
      >
        Reset filters
      </button>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
  @Input() categories: FilterOption[] = [];
  @Input() tags: FilterOption[] = [];
  @Input() selectedCategory: string | null = null;
  @Input() selectedTags: string[] = [];
  @Output() categoryChange = new EventEmitter<string | null>();
  @Output() tagsChange = new EventEmitter<string[]>();
  @Output() reset = new EventEmitter<void>();

  toggleTag(value: string): void {
    const current = new Set(this.selectedTags);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    this.tagsChange.emit(Array.from(current));
  }
}
