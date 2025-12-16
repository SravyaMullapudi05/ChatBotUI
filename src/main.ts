import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { inject } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { CHATBOT_CONFIG } from 'bhulekha-chatbot';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    // ✅ Angular 17 interceptor registration
    provideHttpClient(
      withInterceptors([
        (req, next) => inject(ApiInterceptor).intercept(req, next)
      ])
    ),

    // ✅ Provide library config (from environment)
    {
      provide: CHATBOT_CONFIG,
      useValue: {
        apiBase: environment.apiBase,
        qpLanguageCode: environment.qpLanguageCode,
        qpTcRequestId: environment.qpTcRequestId,
        qpfUuid: environment.qpfUuid,
        apiToken: localStorage.getItem('access_token') || environment.apiToken,
      }
    }    
  ]
}).catch(err => console.error(err));
