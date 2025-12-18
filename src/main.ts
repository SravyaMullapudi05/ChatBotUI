import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ApiInterceptor } from './core/interceptors/api.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    // ✅ Animations (Angular Material etc.)
    provideAnimations(),

    // ✅ Standalone routing
    provideRouter(routes),

    // ✅ HttpClient with DI interceptors support
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ Register HTTP interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
