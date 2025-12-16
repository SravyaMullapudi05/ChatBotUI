import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public apiSrvc: ApiService,
    public tokenService: TokenService) {
    this.apiSrvc.loginGuest().subscribe({
      next: (res) => {
        const token = res?.data?.access_token;
        this.tokenService.setToken(token);
        console.log('Token Saved:', token);
      }
    });
  }
}
