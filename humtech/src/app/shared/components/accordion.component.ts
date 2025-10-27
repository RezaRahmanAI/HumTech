import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-3">
      <div *ngFor="let item of items" class="rounded-2xl border border-secondary-100 bg-accent">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-secondary-800"
          (click)="toggle(item.id)"
        >
          <span>{{ item.title }}</span>
          <span class="text-primary">{{ isOpen(item.id) ? '−' : '+' }}</span>
        </button>
        <div *ngIf="isOpen(item.id)" class="px-5 pb-5 text-sm text-secondary-600">
          {{ item.content }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  private readonly openItems = signal<Set<string>>(new Set());

  toggle(id: string): void {
    const current = new Set(this.openItems());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.openItems.set(current);
  }

  isOpen(id: string): boolean {
    return this.openItems().has(id);
  }
}
