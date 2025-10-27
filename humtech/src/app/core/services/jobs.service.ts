import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { JobPosting } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private readonly jobs = signal<JobPosting[]>([
    {
      id: 'lead-frontend-engineer',
      title: 'Lead Frontend Engineer',
      department: 'Engineering',
      location: 'Remote - Global',
      type: 'Full-time',
      description:
        'Architect and deliver design systems and high-performance web applications with Angular, micro-frontends, and state-of-the-art tooling.',
      requirements: [
        '8+ years of frontend engineering experience with Angular or similar frameworks',
        'Expertise in state management, web performance, and accessibility',
        'Experience leading squads and mentoring engineers',
        'Familiarity with WebGL, GSAP, and advanced animation patterns',
      ],
      postedDate: '2025-01-10T00:00:00.000Z',
      experienceLevel: 'Senior',
    },
    {
      id: 'ai-solutions-architect',
      title: 'AI Solutions Architect',
      department: 'Data & AI',
      location: 'Toronto, Canada',
      type: 'Full-time',
      description:
        'Own the strategy and delivery of AI initiatives including LLM deployment, predictive analytics, and Responsible AI governance.',
      requirements: [
        '7+ years delivering enterprise AI/ML solutions',
        'Deep knowledge of Azure OpenAI, LangChain, and vector databases',
        'Ability to communicate complex concepts to executive stakeholders',
        'Experience with MLOps pipelines and monitoring',
      ],
      postedDate: '2025-01-04T00:00:00.000Z',
      experienceLevel: 'Lead',
    },
    {
      id: 'enterprise-account-executive',
      title: 'Enterprise Account Executive',
      department: 'Revenue',
      location: 'Chicago, USA',
      type: 'Full-time',
      description:
        'Drive pipeline growth for Hum Tech solutions with consultative selling, value engineering, and strategic account planning.',
      requirements: [
        '5+ years in enterprise SaaS or services sales',
        'Proven track record exceeding $2M annual quota',
        'Strong storytelling and executive communication skills',
        'Experience working with RevOps and marketing teams to accelerate deals',
      ],
      postedDate: '2024-12-28T00:00:00.000Z',
      experienceLevel: 'Mid',
    },
  ]);

  getAll(): Observable<JobPosting[]> {
    return of(this.jobs());
  }

  getById(id: string): Observable<JobPosting | undefined> {
    return of(this.jobs().find((job) => job.id === id));
  }

  create(job: JobPosting): Observable<JobPosting> {
    if (this.jobs().some((item) => item.id === job.id)) {
      return throwError(() => new Error('Job already exists'));
    }
    this.jobs.update((items) => [...items, job]);
    return of(job);
  }

  update(job: JobPosting): Observable<JobPosting> {
    const jobs = this.jobs();
    const index = jobs.findIndex((item) => item.id === job.id);
    if (index === -1) {
      return throwError(() => new Error('Job not found'));
    }
    const updated = [...jobs];
    updated[index] = job;
    this.jobs.set(updated);
    return of(job);
  }

  delete(id: string): Observable<void> {
    this.jobs.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }
}
