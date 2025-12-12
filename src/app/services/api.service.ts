// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token = environment.apiToken || '';

  constructor(private http: HttpClient) { }

  loginGuest(): Observable<any> {
    const url = 'https://mplr-qa-dashboard.quantela.com/user/guest/public/login';
    return this.http.post<any>(url, { tenant_id: 'mpqa.com' });
  }
  
}
