import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { CHATBOT_CONFIG, ChatbotConfig } from 'bhulekha-chatbot';

@Injectable()
export class ApiInterceptor {

  constructor(
    @Inject(CHATBOT_CONFIG) private config: ChatbotConfig
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> {

    const isGuestLogin = req.url.includes('/user/guest/public/login');

    let headers = req.headers
      .set('qp-language-code', this.config.qpLanguageCode)
      .set('qp-tc-request-id', this.config.qpTcRequestId)
      .set('QPF-uuid', this.config.qpfUuid)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

      if (this.config.apiToken) {
        headers = headers.set('Authorization', `Bearer ${this.config.apiToken}`);
      }      

    // ✅ token comes from APP via config
    if (this.config.apiToken && !isGuestLogin) {
      headers = headers.set(
        'Authorization',
        `Bearer ${this.config.apiToken}`
      );
    }

    return next(req.clone({ headers }));
  }
}
