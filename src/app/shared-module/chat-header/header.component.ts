import {
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  MatMenuTrigger,
  MatMenu,
  MatMenuItem,
  MatMenuModule
} from '@angular/material/menu';
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { UserBotMessagesComponent } from '../user-bot-messages/user-bot-messages.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    MatButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    NgFor,
    MatMenuItem,
    MatIconButton,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    OverlayModule,
    MatMenuModule,
    UserBotMessagesComponent,
    ChatFooterComponent
  ]
})
export class HeaderComponent {

  /* ✅ MENU TRIGGERS (IMPORTANT) */
  @ViewChild('langTrigger') langTrigger!: MatMenuTrigger;
  @ViewChild('settingsTrigger') settingsTrigger!: MatMenuTrigger;

  /* Languages */
  languages = [
    { id: 1, code: 'en', label: 'English', flag: '../assets/images/GB.png' },
    { id: 2, code: 'hi', label: 'हिंदी', flag: '../assets/images/IN.png' }
  ];

  selectedLanguage = this.languages[0];

  /* Settings */
  settingsOptions = [
    { id: 1, label: 'Clear History' },
    { id: 2, label: 'Sound Notifications' }
  ];

  /* OUTPUT EVENTS */
  @Output() translateClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();
  @Output() minimizeClick = new EventEmitter<void>();
  @Output() closeClick = new EventEmitter<void>();
  @Output() languageSelected = new EventEmitter<any>();
  @Output() settingsSelected = new EventEmitter<any>();

  /* LANGUAGE */
  selectLanguage(lang: any) {
    this.selectedLanguage = lang;
    this.languageSelected.emit(lang);
    this.langTrigger?.closeMenu();   // ✅ close overlay
  }

  /* SETTINGS */

  selectSetting(item: any) {
    this.settingsSelected.emit(item);
    this.settingsTrigger?.closeMenu();
  }
  

  /* ✅ SINGLE SOURCE OF TRUTH */
  closeAllMenus() {
    this.langTrigger?.closeMenu();
    this.settingsTrigger?.closeMenu();
  }

  /* HEADER ACTIONS */
  onHeaderButton(icon: string) {
    if (icon === 'translate') {
      this.translateClick.emit();
    } else if (icon === 'settings') {
      this.settingsClick.emit();
    } else if (icon === 'remove') {
      this.closeAllMenus();
      this.minimizeClick.emit();
    } else if (icon === 'close') {
      this.closeAllMenus();
      this.closeClick.emit();
    }
  }

  onMinimize() {
    this.closeAllMenus();        // ✅ CLOSE LANGUAGE + SETTINGS
    this.minimizeClick.emit();  // emit after closing
  }

  onClose() {
    this.closeAllMenus();       // ✅ CLOSE LANGUAGE + SETTINGS
    this.closeClick.emit();     // emit after closing
  }

}
