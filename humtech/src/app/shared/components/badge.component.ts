import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
      [ngClass]="variantClass"
    >
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'neutral' = 'primary';

  get variantClass(): string {
    switch (this.variant) {
      case 'success':
        return 'bg-emerald-100 text-emerald-700';
      case 'warning':
        return 'bg-amber-100 text-amber-700';
      case 'neutral':
        return 'bg-secondary-100 text-secondary-600';
      default:
        return 'bg-primary-50 text-primary';
    }
  }
}
