import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatModalComponent } from 'src/app/chat-modal/chat-modal.component';
import { WelcomeScreenComponent } from 'src/app/welcome-screen/welcome-screen.component';

@Component({
  selector: 'app-services-module',
  templateUrl: './services-module.component.html',
  styleUrls: ['./services-module.component.css'],
  standalone: true,
  imports: [NgFor, NgIf,
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
})
export class ServicesModuleComponent implements OnInit {

  @Input() subModules: any[] = [];
  @Input() moduleName: string;
  @Input() Allmessages: any[] = []
  @Output() moduleSelected = new EventEmitter<string>();

  currentTime = "";

  ngOnInit(): void {
    this.updateTime();
  }

  ngOnChanges() {
    this.updateTime();
    this.setupMessages();
  }

  updateTime() {
    const now = new Date();
    this.currentTime =
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  setupMessages() {
    // this.messages = [
    //   {
    //     headermessage: 'Please select the module for which you want to check the application status:',
    //     subModules: this.Allmessages.subModules
    //   },
    //   {
    //     headermessage: 'Are you satisfied with the response?',
    //     buttons: [
    //       { name: 'Yes', action: () => this.closeServices() },
    //       { name: 'No', action: () => this.closeServices() }
    //     ]
    //   }
    // ];

    this.messages = this.Allmessages
  }

  messages = [];

  closeServices() {
    console.log("Services closed");
  }

  selectStatusModule(module) {
    if (this.moduleName == 'services') {
      let path = (module.id == 7)
        ? module.path
        : `https://webgis2.mpbhulekh.gov.in/#/${module.path}`;
      window.open(`${path}`, "_blank");
    } else {
      this.moduleSelected.emit(module);
    }
  }

}
