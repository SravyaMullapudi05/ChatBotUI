import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import {
  Component,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'lib-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    OverlayModule,
    MatMenuModule,
    ChatModalComponent
  ],
})
export class WelcomeScreenComponent {
  @Input() drawer!: MatSidenav; 
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  getstarted = false;

  constructor() { }

  getStarted() {
    this.getstarted = true;
  }

  makeGetStartedFalse() {
    this.getstarted = false;
  }
}
