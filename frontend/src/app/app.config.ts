import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ApiHttpInterceptor } from './http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },

    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient()
  ],
};
