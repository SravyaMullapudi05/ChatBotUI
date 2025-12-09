import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChatModalComponent } from './chat-modal/chat-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  openChat() {
    this.drawer.open();
  }

  headerTitle = 'WebGIS 2.0 Portal - Bhulekhā';
}
