import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { ChatModalComponent } from './chat-modal/chat-modal.component';
import { ApiService } from './services/api.service';
import { TokenService } from './services/token.service';
import { environment } from '../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  headerTitle = 'WebGIS 2.0 Portal - Bhulekhā';

  constructor(
    public apiSrvc: ApiService,
    public tokenService: TokenService
  ) { }

  ngOnInit() {
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
}
