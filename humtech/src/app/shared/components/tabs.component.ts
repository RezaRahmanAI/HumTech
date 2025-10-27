import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="flex flex-wrap gap-2 rounded-full bg-secondary-100 p-1">
        <button
          *ngFor="let tab of tabs"
          type="button"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
          [class.bg-accent]="tab.id === activeTab"
          [class.text-primary]="tab.id === activeTab"
          [class.text-secondary-600]="tab.id !== activeTab"
          (click)="select.emit(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string | null = null;
  @Output() select = new EventEmitter<string>();
}
