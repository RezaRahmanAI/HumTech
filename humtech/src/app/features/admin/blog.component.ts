import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../../core/services/blog.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, DatePipe, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Blog posts</h2>
          <p class="text-sm text-secondary-600">Manage content, authors, and categories.</p>
        </div>
        <app-cta-button variant="primary" type="button">Create article</app-cta-button>
      </div>
      <div class="overflow-hidden rounded-3xl border border-secondary-100">
        <table class="min-w-full divide-y divide-secondary-100 text-sm">
          <thead class="bg-secondary-50 text-secondary-500">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Title</th>
              <th class="px-4 py-3 text-left font-semibold">Category</th>
              <th class="px-4 py-3 text-left font-semibold">Author</th>
              <th class="px-4 py-3 text-left font-semibold">Published</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-100 bg-accent">
            <tr *ngFor="let article of articles()" class="text-secondary-700">
              <td class="px-4 py-3 font-medium text-secondary-900">{{ article.title }}</td>
              <td class="px-4 py-3">{{ article.category }}</td>
              <td class="px-4 py-3">{{ article.author }}</td>
              <td class="px-4 py-3">{{ article.date | date: 'mediumDate' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogComponent {
  private readonly blogService = inject(BlogService);
  readonly articles = toSignal(this.blogService.getAll(), { initialValue: [] });
}
