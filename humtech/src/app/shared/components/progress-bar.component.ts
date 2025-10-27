import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="flex items-center justify-between text-xs text-secondary-500">
        <span>{{ label }}</span>
        <span>{{ value }}%</span>
      </div>
      <div class="mt-2 h-2 rounded-full bg-secondary-100">
        <div class="h-full rounded-full bg-primary" [style.width.%]="value"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() label = '';
  @Input() value = 0;
}
