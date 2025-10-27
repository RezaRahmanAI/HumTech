import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/70 px-4 py-8"
      role="dialog"
      aria-modal="true"
      *ngIf="open"
    >
      <div class="w-full max-w-2xl rounded-3xl bg-accent p-6 shadow-xl">
        <div class="flex items-start justify-between gap-4">
          <h2 class="font-heading text-lg font-semibold text-secondary-900">{{ title }}</h2>
          <button
            type="button"
            (click)="close.emit()"
            class="rounded-full bg-secondary-100 p-2 text-secondary-600 transition-colors hover:bg-secondary-200"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div class="mt-4 text-sm text-secondary-700">
          <ng-content></ng-content>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-full border border-secondary-200 px-5 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-50"
            (click)="close.emit()"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-full bg-primary px-5 py-2 text-sm font-medium text-accent hover:bg-primary-600"
            (click)="confirm.emit()"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
