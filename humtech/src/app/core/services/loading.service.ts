import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly requestCount = signal(0);

  get isLoading() {
    return this.requestCount.asReadonly();
  }

  start(): void {
    this.requestCount.update((count) => count + 1);
  }

  stop(): void {
    this.requestCount.update((count) => Math.max(count - 1, 0));
  }
}
