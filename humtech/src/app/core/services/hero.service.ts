import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroContent } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly hero = signal<HeroContent>({
    id: 'home-hero',
    title: 'Engineering Digital Platforms that Drive Human Potential',
    subtitle: 'Hum Tech partners with forward-thinking enterprises to build intelligent platforms, AI copilots, and immersive learning ecosystems that scale sustainably.',
    ctaLabel: 'Schedule a Strategy Call',
    ctaLink: '/contact',
    secondaryCtaLabel: 'Explore Our Services',
    secondaryCtaLink: '/services',
    backgroundImage: 'assets/images/hero/hero-bg.webp',
    highlights: [
      'Enterprise-grade engineering squads',
      'API-first architecture & automation',
      'Human-centered design with measurable ROI',
    ],
  });

  getHero(): Observable<HeroContent> {
    return of(this.hero());
  }

  update(hero: HeroContent): Observable<HeroContent> {
    this.hero.set(hero);
    return of(hero);
  }
}
