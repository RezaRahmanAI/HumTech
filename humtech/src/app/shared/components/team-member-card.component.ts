import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-team-member-card',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <article
      appScrollReveal
      class="flex h-full flex-col items-center gap-4 rounded-3xl border border-secondary-100 bg-accent p-6 text-center shadow-sm"
    >
      <img [src]="member.photo" [alt]="member.name" class="h-24 w-24 rounded-full object-cover" loading="lazy" />
      <div>
        <h3 class="font-heading text-lg font-semibold text-secondary-900">{{ member.name }}</h3>
        <p class="text-sm text-primary">{{ member.position }}</p>
      </div>
      <p class="text-sm text-secondary-600">{{ member.bio }}</p>
      <div class="mt-auto flex items-center justify-center gap-3">
        <a
          *ngFor="let link of member.social"
          [href]="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-full bg-primary-50 px-3 py-2 text-xs font-medium uppercase tracking-wide text-primary transition-colors hover:bg-primary-100"
        >
          {{ link.platform }}
        </a>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberCardComponent {
  @Input({ required: true }) member!: TeamMember;
}
