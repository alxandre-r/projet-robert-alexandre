import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getJwtToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          const authHeader = evt.headers.get('Authorization');
          if (authHeader) {
            const tokenMatch = authHeader.match(/Bearer\s+(.+)/);
            if (tokenMatch) {
              this.authService.setJwtToken(tokenMatch[1]);
            }
          }
        }
      })
    );
  }
}
