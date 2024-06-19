import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ApiHttpInterceptor } from './http-interceptor';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './components/cart/state/cart.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },

    importProvidersFrom(NgxsModule.forRoot([CartState])),

    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient()
  ],
};
