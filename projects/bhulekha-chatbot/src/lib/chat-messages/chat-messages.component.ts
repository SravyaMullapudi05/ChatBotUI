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
import { WelcomeScreenComponent } from '../welcome-screen/welcome-screen.component';


@Component({
  selector: 'lib-chat-messages',
    standalone: true,
    imports: [
      CommonModule,
  
      // Angular Material
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
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  headerTitle = 'WebGIS 2.0 Portal - Bhulekhā';

  constructor(
 
  ) {}

  ngOnInit() {

  }

  openChat() {
    this.drawer.open();
  }
}

