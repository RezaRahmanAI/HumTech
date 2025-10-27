import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../../core/services/blog.service';
import { BlogCardComponent } from '../../shared/components/blog-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar.component';
import { TabsComponent, TabItem } from '../../shared/components/tabs.component';
import { PaginationComponent } from '../../shared/components/pagination.component';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, SearchBarComponent, TabsComponent, PaginationComponent],
  template: `
    <section class="bg-secondary-50 py-12">
      <div class="section-container space-y-6">
        <h1 class="font-heading text-4xl font-semibold text-secondary-900">Insights & Resources</h1>
        <p class="max-w-3xl text-sm text-secondary-600">
          Explore thought leadership on AI, engineering, product strategy, and enablement from the Hum Tech team.
        </p>
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <app-search-bar
            class="w-full max-w-sm"
            [value]="search()"
            placeholder="Search articles..."
            (valueChange)="updateSearch($event)"
            (clear)="updateSearch('')"
          ></app-search-bar>
          <app-tabs [tabs]="categoryTabs" [activeTab]="activeCategory()" (select)="selectCategory($event)"></app-tabs>
        </div>
      </div>
    </section>

    <section class="section-container py-16">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <app-blog-card *ngFor="let article of paginatedArticles()" [article]="article"></app-blog-card>
        <p *ngIf="!paginatedArticles().length" class="rounded-3xl border border-secondary-100 bg-accent p-6 text-sm text-secondary-600">
          No articles found. Try a different search or category filter.
        </p>
      </div>
      <div class="mt-10 flex justify-center">
        <app-pagination [page]="page()" [totalPages]="totalPages()" (pageChange)="page.set($event)"></app-pagination>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent {
  private readonly blogService = inject(BlogService);
  private readonly metaService = inject(MetaService);

  readonly articles = toSignal(this.blogService.getAll(), { initialValue: [] });
  readonly search = signal('');
  readonly activeCategory = signal<string>('all');
  readonly filteredArticles = signal(this.articles());
  readonly page = signal(1);
  readonly pageSize = 6;

  readonly categoryTabs: TabItem[] = [
    { id: 'all', label: 'All' },
    { id: 'Artificial Intelligence', label: 'AI' },
    { id: 'Engineering', label: 'Engineering' },
    { id: 'Growth', label: 'Growth' },
  ];

  constructor() {
    this.metaService.update({
      title: 'Insights & Resources',
      description: 'Read Hum Tech articles on enterprise engineering, AI strategy, and growth enablement.',
    });
    effect(() => {
      const articles = this.articles();
      const searchTerm = this.search().toLowerCase();
      const category = this.activeCategory();

      const filtered = articles.filter((article) => {
        const matchesSearch =
          !searchTerm ||
          article.title.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || article.category === category;
        return matchesSearch && matchesCategory;
      });

      this.filteredArticles.set(filtered);
      this.page.set(1);
    });
  }

  updateSearch(value: string): void {
    this.search.set(value);
  }

  selectCategory(categoryId: string): void {
    this.activeCategory.set(categoryId);
  }

  paginatedArticles() {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredArticles().slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.max(1, Math.ceil(this.filteredArticles().length / this.pageSize));
  }
}
