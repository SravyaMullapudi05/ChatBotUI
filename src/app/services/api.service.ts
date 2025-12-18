import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private readonly LANGUAGE_KEY = 'Language';

  setLanguage(languageSelected: string): void {
    if (languageSelected) {
      environment['Language'] = languageSelected
      localStorage.setItem(this.LANGUAGE_KEY, languageSelected);
    }
  }

  getLanguage() {
    return localStorage.getItem(this.LANGUAGE_KEY);
  }

  loginGuest(): Observable<any> {
    const url =
      'https://mplr-qa-dashboard.quantela.com/user/guest/public/login';

    return this.http.post<any>(url, {
      tenant_id: 'mpqa.com'
    });
  }
}
