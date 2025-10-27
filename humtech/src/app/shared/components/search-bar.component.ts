import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 rounded-full border border-secondary-200 bg-accent px-4 py-2">
      <span class="text-secondary-400">🔍</span>
      <input
        type="search"
        [value]="value"
        (input)="onInput($event)"
        class="w-full border-none bg-transparent text-sm text-secondary-700 placeholder:text-secondary-400 focus:outline-none"
        [placeholder]="placeholder"
      />
      <button
        *ngIf="value"
        type="button"
        class="text-xs font-medium text-secondary-400 hover:text-primary"
        (click)="clear.emit()"
      >
        Clear
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Input() value = '';
  @Input() placeholder = 'Search';
  @Output() valueChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
