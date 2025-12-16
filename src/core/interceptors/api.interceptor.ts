import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const isGuestLogin = req.url.includes('/user/guest/public/login');
    const token = this.tokenService.getToken();

    let headers = req.headers
      .set('qp-language-code', environment.qpLanguageCode)
      .set('qp-tc-request-id', environment.qpTcRequestId)
      .set('QPF-uuid', environment.qpfUuid)
      .set('Accept', 'application/json, text/plain, */*')
      .set('Content-Type', 'application/json');
    // ✅ Add Authorization ONLY when needed
    if (token && !isGuestLogin) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return next.handle(req.clone({ headers }));
  }
}
