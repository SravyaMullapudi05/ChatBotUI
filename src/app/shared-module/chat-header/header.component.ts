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
import { ApiService } from 'src/app/services/api.service';


interface Language {
  code: string;
  label: string;
  flag: string;
}

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

  constructor(private apiService: ApiService) { }

  /*  MENU TRIGGERS*/
  @ViewChild('langTrigger') langTrigger!: MatMenuTrigger;
  @ViewChild('settingsTrigger') settingsTrigger!: MatMenuTrigger;

  /* Languages */
  languages: Language[] = [
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

  selectedLanguage: any;

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

  ngOnInit(): void {
    const savedLangCode = this.apiService.getLanguage(); // 'en' | 'hi' | null

    const lang =
      this.languages.find(l => l.code === savedLangCode) ??
      this.languages[0];

    this.selectLanguage(lang);
  }

  /* LANGUAGE */
  selectLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.apiService.setLanguage(lang.code);
    this.languageSelected.emit(lang);
    this.langTrigger?.closeMenu();
  }

  /* SETTINGS */

  selectSetting(item: any) {
    this.settingsSelected.emit(item);
    this.settingsTrigger?.closeMenu();
  }


  closeAllMenus() {
    this.settingsTrigger.closeMenu();
    this.langTrigger.closeMenu();
  }

  onLanguageMenuOpened(): void {
    // Close settings if open
    if (this.settingsTrigger?.menuOpen) {
      this.settingsTrigger.closeMenu();
    }
  }

  onSettingsMenuOpened(): void {
    // Close language if open
    if (this.langTrigger?.menuOpen) {
      this.langTrigger.closeMenu();
    }
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
    this.closeAllMenus();
    this.minimizeClick.emit();
  }

  onClose() {
    this.closeAllMenus()
    this.closeClick.emit();   
  }

}
