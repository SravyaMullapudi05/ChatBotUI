import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showmainmenu: boolean;
  awaitingApplicationNumber: boolean;
  subModules: any[];
  messages: any[];
  drawer: any;

  ngOnInit(): void {

  }

  /* HEADER MENU STATE */
  showLanguageMenu = false;
  showSettingsMenu = false;

  /* HEADER ACTION BUTTONS */
  headerActions = [
    { icon: 'translate', title: 'Translate', click: () => this.onTranslateClick() },
    { icon: 'settings', title: 'Settings', click: () => this.onSettingsClick() },
    { icon: 'remove', title: 'Minimize', click: () => this.onMinimizeClick() },
    { icon: 'close', title: 'Close', click: () => this.closeChat() }
  ];

  /* LANGUAGES */
  languages = [
    { id: 1, code: 'en', label: 'English' },
    { id: 2, code: 'hi', label: 'हिंदी' }
  ];

  /* SETTINGS MENU OPTIONS */
  settingsOptions = [
    { id: 1, label: 'Clear History', action: () => this.onClearHistory() },
    { id: 2, label: 'Sound Notifications', action: () => this.onToggleSound() }
  ];

  /* OUTPUT EVENT TO INFORM PARENT */
  @Output() closeChatEvent = new EventEmitter<void>();

  /* -------- HEADER METHODS ---------- */

  /** Toggle language dropdown */
  onTranslateClick() {
    this.showLanguageMenu = !this.showLanguageMenu;
    this.showSettingsMenu = false; // auto-hide settings
  }

  /** Toggle settings dropdown */
  onSettingsClick() {
    this.showSettingsMenu = !this.showSettingsMenu;
    this.showLanguageMenu = false; // auto-hide languages
  }

  /** When user selects a language */
  selectLanguage(lang: any) {
    console.log('Selected Language:', lang);
    this.showLanguageMenu = false;
  }

  /** Clear chat history */
  onClearHistory() {
    this.showmainmenu = true;
    this.awaitingApplicationNumber = false;
    this.subModules = [];
    this.messages = [];
  }

  /** Toggle sound option */
  onToggleSound() {
    console.log("Sound toggled");
  }

  /** Minimize chat window */
  onMinimizeClick() {
    this.drawer?.close();
  }

  /** Close chat completely */
  closeChat() {
    this.onClearHistory();
    this.drawer?.close();
    this.closeChatEvent.emit(); // notify parent to show welcome screen again
  }


}
