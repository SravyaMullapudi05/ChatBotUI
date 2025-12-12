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

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();

    const modifiedReq = req.clone({
      setHeaders: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'qp-language-code': environment.qpLanguageCode,
        'qp-tc-request-id': environment.qpTcRequestId,
        'QPF-uuid': environment.qpfUuid,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(modifiedReq);
  }
}
