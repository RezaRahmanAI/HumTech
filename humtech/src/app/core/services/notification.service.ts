import { Injectable, signal } from '@angular/core';

export interface NotificationMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly notifications = signal<NotificationMessage[]>([]);

  get notifications$() {
    return this.notifications.asReadonly();
  }

  push(notification: NotificationMessage): void {
    this.notifications.update((items) => [...items, notification]);
  }

  dismiss(id: string): void {
    this.notifications.update((items) => items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.notifications.set([]);
  }
}
