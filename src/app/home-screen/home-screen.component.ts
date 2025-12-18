import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { ApiService } from '../services/api.service';
import { TokenService } from '../services/token.service';
import { WelcomeScreenComponent } from '../welcome-screen/welcome-screen.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    CommonModule,
    ChatModalComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,

    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    OverlayModule,
    MatMenuModule,
    WelcomeScreenComponent
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  headerTitle = 'WebGIS 2.0 Portal - Bhulekhā';
  showfab = true;
  showTooltip = false;
  constructor(
    public apiSrvc: ApiService,
    public tokenService: TokenService
  ) { }

  ngOnInit() {
    this.tokenService.clearToken()
    this.apiSrvc.loginGuest().subscribe({
      next: (res) => {
        const token = res?.data?.access_token;
        this.tokenService.setToken(token);
        console.log('Token Saved:', token);
      }
    });
  }

  openChat() {
    this.drawer.open();
  }

  showWelcomeScreen = true;
  showChatModal(event) {
    this.showWelcomeScreen = !event
  }

}

