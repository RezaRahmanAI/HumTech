import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="text-xs text-secondary-500" aria-label="Breadcrumb">
      <ol class="flex flex-wrap items-center gap-2">
        <li *ngFor="let crumb of crumbs; let last = last" class="flex items-center gap-2">
          <ng-container *ngIf="crumb.path && !last; else current">
            <a [routerLink]="crumb.path" class="font-medium text-secondary-600 hover:text-primary">{{ crumb.label }}</a>
            <span aria-hidden="true" class="text-secondary-300">/</span>
          </ng-container>
          <ng-template #current>
            <span class="font-medium text-secondary-400">{{ crumb.label }}</span>
          </ng-template>
        </li>
      </ol>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() crumbs: BreadcrumbItem[] = [];
}
