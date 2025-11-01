import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatMetric } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        *ngFor="let stat of stats"
        appScrollReveal
        class="relative overflow-hidden rounded-3xl bg-secondary-900 p-8 text-center text-accent shadow-lg shadow-secondary-900/30"
      >
        <span class="pointer-events-none absolute -top-10 right-0 h-32 w-32 rounded-full bg-primary-400/40 blur-3xl"></span>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-accent/60">{{ stat.label }}</p>
        <p class="mt-4 font-heading text-4xl font-semibold">
          {{ animatedValue(stat.id) | number: '1.0-0' }}{{ stat.suffix }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCounterComponent implements OnInit, OnDestroy {
  @Input({ required: true }) stats: StatMetric[] = [];
  private animationFrameId: number | null = null;
  private readonly values = signal<Record<string, number>>({});

  ngOnInit(): void {
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  animatedValue(id: string): number {
    return this.values()[id] ?? 0;
  }

  private animate(startTime = performance.now()): void {
    const duration = 1200;
    const initialValues = this.stats.reduce<Record<string, number>>((acc, stat) => {
      acc[stat.id] = 0;
      return acc;
    }, {});

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValues = { ...initialValues };
      for (const stat of this.stats) {
        nextValues[stat.id] = Math.round(stat.value * eased);
      }
      this.values.set(nextValues);
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }
}
