import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
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
    MatMenuModule],
})
export class WelcomeScreenComponent {

  @Input() drawer: MatSidenav | any;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  // 🔥 This tells the parent to switch to chat component

  constructor() { }
  getstarted = false

  getStarted() {
    this.getstarted = true
  }

  makeGetStartedFalse() {
    this.getstarted = false
  }

}
