import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StatMetric } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private readonly stats = signal<StatMetric[]>([
    { id: 'clients', label: 'Global Clients', value: 120, suffix: '+' },
    { id: 'deployments', label: 'Enterprise Deployments', value: 250, suffix: '+' },
    { id: 'uptime', label: 'Platform Uptime', value: 99.98, suffix: '%' },
    { id: 'learners', label: 'Academy Graduates', value: 1800, suffix: '+' },
  ]);

  getAll(): Observable<StatMetric[]> {
    return of(this.stats());
  }
}
