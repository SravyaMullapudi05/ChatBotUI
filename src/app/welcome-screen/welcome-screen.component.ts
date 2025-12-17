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
  selectedLanguage: string;
 
  // 🔥 This tells the parent to switch to chat component
 
  constructor() { }
  ngOnInit(){
    this.selectLanguage(this.languages[0].code)
  }
  getstarted = false
  welcomeActions = [
    {
      id: 1,
      label: 'Check application status',
      icon: 'task_alt'
    },
    {
      id: 2,
      label: 'Access services and FAQs',
      icon: 'task_alt'
    },
    {
      id: 3,
      label: 'Download forms and documents',
      icon: 'task_alt'
    },
    {
      id: 4,
      label: 'Get contact information',
      icon: 'task_alt'
    }
  ];
 
  languages = [
    {
      code: 'en',
      label: 'English',
      flag: '../assets/images/GB.png'
    },
    {
      code: 'hi',
      label: 'हिंदी',
      flag: '../assets/images/IN.png'
    }
  ];
 
  getStarted() {
    this.getstarted = true
  }
 
  makeGetStartedFalse() {
    this.getstarted = false
  }
 
 
  selectLanguage(code: string) {
    this.selectedLanguage = code
    console.log(this.selectedLanguage)
  }
 
}
 