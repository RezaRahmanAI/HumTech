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
        class="rounded-3xl border border-secondary-100 bg-accent p-6 text-center shadow-sm"
      >
        <p class="text-sm uppercase tracking-wide text-secondary-500">{{ stat.label }}</p>
        <p class="mt-2 font-heading text-3xl font-semibold text-secondary-900">
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
