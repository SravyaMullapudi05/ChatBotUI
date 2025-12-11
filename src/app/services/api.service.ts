// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token = environment.apiToken || '';

  constructor(private http: HttpClient) {}

  /** Only allowed custom headers */
  private getDefaultHeaders(extra?: Record<string, string>): HttpHeaders {
    const defaults = new HttpHeaders({
      "Authorization": `Bearer ${this.token}`,
      "qp-language-code": "en",
      "qp-tc-request-id": environment.qpTcRequestId,
      "QPF-uuid": environment.qpfUuid,
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    });
    

    const merged = { ...defaults, ...(extra || {}) };
    return new HttpHeaders(merged);
  }

  get<T>(url: string, params?: Record<string, string | number>, extraHeaders?: Record<string, string>) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(k =>
        httpParams = httpParams.set(k, String(params[k]))
      );
    }

    return this.http.get<T>(url, {
      headers: this.getDefaultHeaders(extraHeaders),
      params: httpParams
    });
  }

  post<T>(url: string, body: any = {}, extraHeaders?: Record<string, string>) {
    return this.http.post<T>(url, body, {
      headers: this.getDefaultHeaders(extraHeaders)
    });
  }
}
