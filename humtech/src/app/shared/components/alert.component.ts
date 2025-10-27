import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm"
      [ngClass]="{
        'border-emerald-200 bg-emerald-50 text-emerald-700': type === 'success',
        'border-primary-200 bg-primary-50 text-primary': type === 'info',
        'border-amber-200 bg-amber-50 text-amber-700': type === 'warning',
        'border-rose-200 bg-rose-50 text-rose-700': type === 'error'
      }"
    >
      <span class="font-semibold capitalize">{{ type }}</span>
      <div class="flex-1">
        <p>{{ message }}</p>
        <p *ngIf="description" class="text-xs text-secondary-500">{{ description }}</p>
      </div>
      <button
        type="button"
        class="text-xs font-semibold uppercase tracking-wide text-secondary-400 hover:text-secondary-600"
        *ngIf="dismissable"
        (click)="dismiss.emit()"
      >
        Close
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() message = '';
  @Input() description?: string;
  @Input() dismissable = false;
  @Output() dismiss = new EventEmitter<void>();
}
