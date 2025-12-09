import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
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

  makeGetStartedFalse(){
    this.getstarted=false
  }

}
