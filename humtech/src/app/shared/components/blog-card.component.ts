import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogArticle } from '../../core/models/content.models';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, ScrollRevealDirective],
  template: `
    <article
      appScrollReveal
      class="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-accent shadow-xl shadow-secondary-900/10 ring-1 ring-secondary-100/50 transition-transform duration-300 hover:-translate-y-2 hover:ring-primary/40"
    >
      <div class="relative">
        <img
          [src]="article.image"
          [alt]="article.title"
          class="h-48 w-full object-cover"
          loading="lazy"
        />
        <span
          class="absolute left-6 top-5 inline-flex rounded-full bg-secondary-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent"
        >
          {{ article.category }}
        </span>
      </div>
      <div class="flex flex-1 flex-col gap-4 p-6">
        <h3 class="font-heading text-lg font-semibold text-secondary-900 group-hover:text-primary-700">{{ article.title }}</h3>
        <p class="text-sm leading-relaxed text-secondary-600">{{ article.excerpt }}</p>
        <div class="mt-auto flex items-center justify-between text-xs font-medium text-secondary-500">
          <span>{{ article.author }}</span>
          <span>{{ article.date | date: 'mediumDate' }}</span>
        </div>
        <a
          [routerLink]="'/blog/' + article.id"
          class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600"
        >
          Read article
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent {
  @Input({ required: true }) article!: BlogArticle;
}
