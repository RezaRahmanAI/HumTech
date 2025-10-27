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
    <article appScrollReveal class="flex h-full flex-col overflow-hidden rounded-3xl border border-secondary-100 bg-accent">
      <img
        [src]="article.image"
        [alt]="article.title"
        class="h-48 w-full object-cover"
        loading="lazy"
      />
      <div class="flex flex-1 flex-col gap-3 p-6">
        <span class="text-xs font-semibold uppercase tracking-wide text-primary">{{ article.category }}</span>
        <h3 class="font-heading text-lg font-semibold text-secondary-900">{{ article.title }}</h3>
        <p class="text-sm text-secondary-600">{{ article.excerpt }}</p>
        <div class="mt-auto flex items-center justify-between text-xs text-secondary-500">
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
