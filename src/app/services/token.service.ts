import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'access_token';

  constructor() { }

  setToken(token: string): void {
    if (token) {
      environment.apiToken = token
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
