import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FaqItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private readonly faq = signal<FaqItem[]>([
    {
      id: 'engagement-model',
      category: 'Engagement',
      question: 'How does Hum Tech structure delivery engagements?',
      answer:
        'We form dedicated outcome squads with product, design, engineering, QA, and data capabilities. Engagements start with roadmap co-creation and operate in agile increments with quarterly strategy reviews.',
    },
    {
      id: 'api-readiness',
      category: 'Technology',
      question: 'Is the platform ready for ASP.NET Core API integration?',
      answer:
        'Yes. All services are structured with replaceable data providers and our API layer uses an environment-driven base URL, interceptors, and shared DTO contracts.',
    },
    {
      id: 'academy-enrollment',
      category: 'Harm Academy',
      question: 'What is required to enroll in Harm Academy programs?',
      answer:
        'Learners complete a skills assessment, interview, and receive a personalized development plan. Cohorts combine live workshops, labs, and mentorship to accelerate job readiness.',
    },
  ]);

  getAll(): Observable<FaqItem[]> {
    return of(this.faq());
  }

  getById(id: string): Observable<FaqItem | undefined> {
    return of(this.faq().find((item) => item.id === id));
  }

  create(item: FaqItem): Observable<FaqItem> {
    if (this.faq().some((faq) => faq.id === item.id)) {
      return throwError(() => new Error('FAQ already exists'));
    }
    this.faq.update((items) => [...items, item]);
    return of(item);
  }

  update(item: FaqItem): Observable<FaqItem> {
    const items = this.faq();
    const index = items.findIndex((faq) => faq.id === item.id);
    if (index === -1) {
      return throwError(() => new Error('FAQ not found'));
    }
    const updated = [...items];
    updated[index] = item;
    this.faq.set(updated);
    return of(item);
  }

  delete(id: string): Observable<void> {
    this.faq.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }
}
