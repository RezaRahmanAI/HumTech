import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { BlogService } from '../../core/services/blog.service';
import { BadgeComponent } from '../../shared/components/badge.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs.component';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, BadgeComponent, BreadcrumbsComponent, CtaButtonComponent],
  template: `
    <ng-container *ngIf="article(); else loading">
      <section class="bg-secondary-50 py-12">
        <div class="section-container space-y-6">
          <app-breadcrumbs [crumbs]="[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: article()?.title ?? 'Article' }
          ]"></app-breadcrumbs>
          <div class="space-y-4">
            <app-badge variant="primary">{{ article()?.category }}</app-badge>
            <h1 class="font-heading text-4xl font-semibold text-secondary-900">{{ article()?.title }}</h1>
            <div class="text-xs uppercase tracking-wide text-secondary-500">
              {{ article()?.author }} • {{ article()?.date | date: 'longDate' }}
            </div>
          </div>
        </div>
      </section>

      <section class="section-container py-16">
        <img *ngIf="article()?.image" [src]="article()?.image" [alt]="article()?.title" class="w-full rounded-3xl" loading="lazy" />
        <article class="prose prose-slate mt-8 max-w-none text-secondary-700">
          {{ article()?.content }}
        </article>
        <div class="mt-8 flex flex-wrap gap-2">
          <app-badge variant="neutral" *ngFor="let tag of article()?.tags">{{ tag }}</app-badge>
        </div>
      </section>

      <section class="bg-secondary-50 py-16">
        <div class="section-container flex flex-col gap-4 text-center">
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Continue exploring</h2>
          <p class="text-sm text-secondary-600">Ready to transform your digital platforms? Connect with our team for a strategy session.</p>
          <div class="flex justify-center">
            <app-cta-button type="link" variant="primary" href="/contact">Schedule consultation</app-cta-button>
          </div>
        </div>
      </section>
    </ng-container>

    <ng-template #loading>
      <section class="section-container py-20">
        <p class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">Loading article...</p>
      </section>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly metaService = inject(MetaService);

  readonly article = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.blogService.getById(params.get('id') ?? ''))
    ),
    { initialValue: undefined }
  );

  constructor() {
    effect(() => {
      const article = this.article();
      if (article) {
        this.metaService.update({ title: article.title, description: article.excerpt });
      }
    });
  }
}
