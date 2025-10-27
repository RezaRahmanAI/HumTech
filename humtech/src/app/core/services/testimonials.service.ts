import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Testimonial } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private readonly testimonials = signal<Testimonial[]>([
    {
      id: 'northbridge',
      clientName: 'Isabella Moore',
      company: 'Northbridge Logistics',
      review:
        'Hum Tech translated our complex operations into a unified ERP with AI-driven forecasting. Our executive dashboards finally provide real-time clarity.',
      rating: 5,
      photo: 'assets/images/testimonials/isabella-moore.webp',
    },
    {
      id: 'aurora-health',
      clientName: 'Dr. James Patel',
      company: 'Aurora Health',
      review:
        'The mobile care platform delivered by Hum Tech elevated patient satisfaction scores to record highs while keeping compliance airtight.',
      rating: 5,
      photo: 'assets/images/testimonials/james-patel.webp',
    },
    {
      id: 'nova-retail',
      clientName: 'Clara Nguyen',
      company: 'Nova Retail Group',
      review:
        'Their AI squad not only built a forecasting model but established our entire MLOps discipline. We iterate faster with measurable ROI.',
      rating: 4.8,
      photo: 'assets/images/testimonials/clara-nguyen.webp',
    },
  ]);

  getAll(): Observable<Testimonial[]> {
    return of(this.testimonials());
  }

  getById(id: string): Observable<Testimonial | undefined> {
    return of(this.testimonials().find((item) => item.id === id));
  }

  create(testimonial: Testimonial): Observable<Testimonial> {
    if (this.testimonials().some((item) => item.id === testimonial.id)) {
      return throwError(() => new Error('Testimonial already exists'));
    }
    this.testimonials.update((items) => [...items, testimonial]);
    return of(testimonial);
  }

  update(testimonial: Testimonial): Observable<Testimonial> {
    const items = this.testimonials();
    const index = items.findIndex((item) => item.id === testimonial.id);
    if (index === -1) {
      return throwError(() => new Error('Testimonial not found'));
    }
    const updated = [...items];
    updated[index] = testimonial;
    this.testimonials.set(updated);
    return of(testimonial);
  }

  delete(id: string): Observable<void> {
    this.testimonials.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }
}
