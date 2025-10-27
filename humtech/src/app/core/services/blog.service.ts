import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { BlogArticle } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly articles = signal<BlogArticle[]>([
    {
      id: 'ai-platform-blueprint',
      title: 'Blueprint for Building Responsible AI Platforms',
      excerpt: 'Discover the guardrails, architecture decisions, and governance practices that make AI initiatives enterprise-ready.',
      image: 'assets/images/blog/ai-platform.webp',
      date: '2025-01-05T00:00:00.000Z',
      author: 'Li Wei',
      category: 'Artificial Intelligence',
      content:
        'From data readiness assessments to ModelOps automation, this blueprint walks through each milestone required to launch AI solutions responsibly.',
      tags: ['AI', 'Governance', 'MLOps'],
    },
    {
      id: 'erp-modernization',
      title: 'ERP Modernization: Migrating from Legacy to Cloud-Native',
      excerpt: 'A pragmatic roadmap for re-architecting legacy ERP suites with microservices, domain-driven design, and event streams.',
      image: 'assets/images/blog/erp-modernization.webp',
      date: '2024-12-18T00:00:00.000Z',
      author: 'Marco Fernandez',
      category: 'Engineering',
      content:
        'We explore modernization patterns, data migration strategies, and governance models that de-risk cloud ERP transformations.',
      tags: ['ERP', 'Cloud', 'Architecture'],
    },
    {
      id: 'academy-outcomes',
      title: 'How Harm Academy Accelerates Revenue Teams',
      excerpt: 'Learn how our blended learning model, coaching pods, and performance analytics shorten the ramp time for sales teams.',
      image: 'assets/images/blog/harm-academy.webp',
      date: '2024-12-02T00:00:00.000Z',
      author: 'Sylvia Mensah',
      category: 'Growth',
      content:
        'Sales enablement is undergoing a transformation. We outline the curriculum design, coaching frameworks, and placement metrics powering Harm Academy.',
      tags: ['Academy', 'Sales Enablement', 'Growth'],
    },
  ]);

  getAll(): Observable<BlogArticle[]> {
    return of(this.articles());
  }

  getById(id: string): Observable<BlogArticle | undefined> {
    return of(this.articles().find((article) => article.id === id));
  }

  create(article: BlogArticle): Observable<BlogArticle> {
    if (this.articles().some((item) => item.id === article.id)) {
      return throwError(() => new Error('Article already exists'));
    }
    this.articles.update((items) => [...items, article]);
    return of(article);
  }

  update(article: BlogArticle): Observable<BlogArticle> {
    const items = this.articles();
    const index = items.findIndex((item) => item.id === article.id);
    if (index === -1) {
      return throwError(() => new Error('Article not found'));
    }
    const updated = [...items];
    updated[index] = article;
    this.articles.set(updated);
    return of(article);
  }

  delete(id: string): Observable<void> {
    this.articles.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }
}
