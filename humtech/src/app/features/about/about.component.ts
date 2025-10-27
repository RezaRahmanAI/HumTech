import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamService } from '../../core/services/team.service';
import { TeamMemberCardComponent } from '../../shared/components/team-member-card.component';
import { BadgeComponent } from '../../shared/components/badge.component';
import { ImageGalleryComponent } from '../../shared/components/image-gallery.component';
import { GalleryImage } from '../../shared/components/image-gallery.component';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, TeamMemberCardComponent, BadgeComponent, ImageGalleryComponent],
  template: `
    <section class="bg-secondary-50 py-12">
      <div class="section-container space-y-6">
        <app-badge variant="primary">Our story</app-badge>
        <h1 class="font-heading text-4xl font-semibold text-secondary-900">Human-centered technology for ambitious organizations</h1>
        <p class="max-w-3xl text-sm text-secondary-600">
          Hum Tech exists to bridge human potential with resilient technology. We operate as a multidisciplinary studio combining engineering, product strategy, artificial intelligence, and education to unlock growth for our partners.
        </p>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div class="space-y-5">
          <h2 class="font-heading text-3xl font-semibold text-secondary-900">Our mission</h2>
          <p class="text-sm text-secondary-600">
            We partner with enterprise and scale-up teams to build products that are inclusive, secure, and intelligent. Our squads bring together strategy, design, engineering, and enablement to accelerate time-to-value.
          </p>
          <ul class="space-y-3 text-sm text-secondary-600">
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>Design and deliver platforms that adapt to change.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>Empower teams through knowledge transfer, enablement, and Harm Academy.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
              <span>Embed responsible AI practices with measurable business impact.</span>
            </li>
          </ul>
        </div>
        <app-image-gallery [images]="gallery"></app-image-gallery>
      </div>
    </section>

    <section class="bg-secondary-50 py-16">
      <div class="section-container">
        <h2 class="font-heading text-3xl font-semibold text-secondary-900">Leadership team</h2>
        <p class="mt-3 max-w-2xl text-sm text-secondary-600">
          Our leaders bring experience from enterprise transformations, high-growth start-ups, and global AI programs.
        </p>
        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <app-team-member-card *ngFor="let member of team()" [member]="member"></app-team-member-card>
        </div>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-8 md:grid-cols-3">
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Values</h3>
          <p class="mt-3 text-sm text-secondary-600">We champion empathy, experimentation, and excellence in every engagement.</p>
        </div>
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Certifications</h3>
          <p class="mt-3 text-sm text-secondary-600">Azure Solutions Architect Expert, AWS Advanced Partner, ISO 27001 compliant delivery.</p>
        </div>
        <div class="rounded-3xl border border-secondary-100 bg-accent p-6">
          <h3 class="font-heading text-xl font-semibold text-secondary-900">Partnerships</h3>
          <p class="mt-3 text-sm text-secondary-600">Strategic alliances with Microsoft, Google Cloud, HubSpot, and high-growth venture networks.</p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  private readonly teamService = inject(TeamService);
  private readonly metaService = inject(MetaService);

  readonly team = toSignal(this.teamService.getAll(), { initialValue: [] });
  readonly gallery: GalleryImage[] = [
    { src: 'assets/images/about/collaboration.webp', alt: 'Hum Tech workshop' },
    { src: 'assets/images/about/strategy.webp', alt: 'Product strategy session' },
    { src: 'assets/images/about/academy.webp', alt: 'Harm Academy cohort' },
    { src: 'assets/images/about/culture.webp', alt: 'Team culture' },
    { src: 'assets/images/about/innovation.webp', alt: 'Innovation lab' },
    { src: 'assets/images/about/events.webp', alt: 'Community event' },
  ];

  constructor() {
    this.metaService.update({
      title: 'About Hum Tech',
      description: 'Learn about Hum Tech’s mission, leadership team, and values powering enterprise-scale transformations.',
    });
  }
}
