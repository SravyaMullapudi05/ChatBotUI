import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChatModalComponent } from './chat-modal/chat-modal.component';
import { ApiService } from './services/api.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(public apiSrvc: ApiService, public tokenService: TokenService) {

  }

  ngOnInit() {
    this.apiSrvc.loginGuest().subscribe({
      next: (res) => {
        const token = res?.data?.access_token;
        this.tokenService.setToken(token);
        console.log("Token Saved:", token);
      }
    });

  }

  openChat() {
    this.drawer.open();
  }

  headerTitle = 'WebGIS 2.0 Portal - Bhulekhā';
}
