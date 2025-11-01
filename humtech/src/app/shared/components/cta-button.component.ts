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
        class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform duration-200 focus:outline-none focus:ring focus:ring-primary-200"
        [ngClass]="buttonClasses"
      >
        <ng-content></ng-content>
      </a>
      <button
        *ngSwitchDefault
        type="button"
        class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform duration-200 focus:outline-none focus:ring focus:ring-primary-200"
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
        return 'bg-secondary-900 text-accent hover:bg-secondary-800 hover:-translate-y-0.5';
      case 'ghost':
        return 'border border-primary-200 text-primary-600 hover:bg-primary-50 hover:text-primary-700 hover:-translate-y-0.5';
      default:
        return 'bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5';
    }
  }
}
