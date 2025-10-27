import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  template: `
    <div class="pointer-events-none fixed right-6 top-6 z-[100] flex w-80 flex-col gap-3">
      <ng-container *ngFor="let notification of notifications()">
        <app-alert
          class="pointer-events-auto"
          [type]="notification.type"
          [message]="notification.message"
          [description]="notification.description"
          [dismissable]="true"
          (dismiss)="dismiss(notification.id)"
        ></app-alert>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCenterComponent {
  private readonly notificationService = inject(NotificationService);
  readonly notifications = this.notificationService.notifications$;

  dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }
}
