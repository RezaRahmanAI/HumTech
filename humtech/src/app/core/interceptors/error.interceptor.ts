import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

const createId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      notificationService.push({
        id: createId(),
        type: 'error',
        message: 'Request failed',
        description: typeof error === 'string' ? error : error?.message ?? 'Unexpected error occurred.',
      });
      return throwError(() => error);
    })
  );
};
