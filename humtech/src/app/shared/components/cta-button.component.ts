import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container [ngSwitch]="type">
      <a
        *ngSwitchCase="'link'"
        [routerLink]="href"
        class="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all focus:outline-none focus:ring focus:ring-primary-200"
        [ngClass]="buttonClasses"
      >
        <ng-content></ng-content>
      </a>
      <button
        *ngSwitchDefault
        type="button"
        class="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all focus:outline-none focus:ring focus:ring-primary-200"
        [ngClass]="buttonClasses"
      >
        <ng-content></ng-content>
      </button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() type: 'button' | 'link' = 'button';
  @Input() href: string | undefined;

  get buttonClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'bg-secondary-900 text-accent hover:bg-secondary-800';
      case 'ghost':
        return 'border border-primary text-primary hover:bg-primary-50';
      default:
        return 'bg-primary text-accent hover:bg-primary-600';
    }
  }
}
