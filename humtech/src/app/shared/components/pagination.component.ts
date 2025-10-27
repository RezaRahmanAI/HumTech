import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center justify-between gap-3 text-sm text-secondary-600">
      <button
        type="button"
        class="rounded-full border border-secondary-200 px-4 py-2 font-medium transition-colors hover:bg-secondary-50 disabled:cursor-not-allowed disabled:opacity-50"
        (click)="change(page - 1)"
        [disabled]="page === 1"
      >
        Previous
      </button>
      <div class="flex items-center gap-2">
        <button
          *ngFor="let p of pages"
          type="button"
          class="h-9 w-9 rounded-full border border-secondary-200 text-sm font-semibold transition-colors"
          [class.bg-primary]="p === page"
          [class.text-accent]="p === page"
          [class.text-secondary-600]="p !== page"
          (click)="change(p)"
        >
          {{ p }}
        </button>
      </div>
      <button
        type="button"
        class="rounded-full border border-secondary-200 px-4 py-2 font-medium transition-colors hover:bg-secondary-50 disabled:cursor-not-allowed disabled:opacity-50"
        (click)="change(page + 1)"
        [disabled]="page === totalPages"
      >
        Next
      </button>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1).slice(0, 7);
  }

  change(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }
    this.pageChange.emit(page);
  }
}
