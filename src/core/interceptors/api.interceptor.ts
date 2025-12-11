import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${environment.apiToken}`,
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
