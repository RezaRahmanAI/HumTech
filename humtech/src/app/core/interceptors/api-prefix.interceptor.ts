import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const ABSOLUTE_URL = /^https?:\/\//i;

export const apiPrefixInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (ABSOLUTE_URL.test(req.url)) {
    return next(req);
  }

  const sanitizedUrl = req.url.startsWith('/') ? req.url.substring(1) : req.url;
  const apiRequest = req.clone({ url: `${environment.apiUrl}/${sanitizedUrl}` });

  return next(apiRequest);
};
