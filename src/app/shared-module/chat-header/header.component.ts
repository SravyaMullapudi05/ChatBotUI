import { Component, EventEmitter, Output, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('langDropdown') langDropdown!: ElementRef;
  @ViewChild('settingsDropdown') settingsDropdown!: ElementRef;

  /* Header Buttons */
  headerActions = [
    { icon: 'translate', title: 'Translate' },
    { icon: 'settings', title: 'Settings' },
    { icon: 'remove', title: 'Minimize' },
    { icon: 'close', title: 'Close' }
  ];

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

  showLanguageMenu = false;
  showSettingsMenu = false;

  /* OUTPUT EVENTS */
  @Output() translateClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();
  @Output() minimizeClick = new EventEmitter<void>();
  @Output() closeClick = new EventEmitter<void>();
  @Output() languageSelected = new EventEmitter<any>();
  @Output() settingsSelected = new EventEmitter<any>();

  /* Universal header actions */
  onHeaderButton(icon: string) {
    if (icon === 'translate') {
      this.showLanguageMenu = !this.showLanguageMenu;
      this.showSettingsMenu = false;
      this.translateClick.emit();
    } else if (icon === 'settings') {
      this.showSettingsMenu = !this.showSettingsMenu;
      this.showLanguageMenu = false;
      this.settingsClick.emit();
    } else if (icon === 'remove') {
      this.closeAllMenus();
      this.minimizeClick.emit();
    } else if (icon === 'close') {
      this.closeAllMenus();
      this.closeClick.emit();
    }
  }

  selectLanguage(lang: any) {
    this.selectedLanguage = lang;
    this.languageSelected.emit(lang);
    this.showLanguageMenu = false;
  }

  selectSetting(item: any) {
    this.settingsSelected.emit(item);
    this.showSettingsMenu = false;
  }

  closeAllMenus() {
    this.showLanguageMenu = false;
    this.showSettingsMenu = false;
  }

  /* CLOSE ONLY WHEN CLICK IS OUTSIDE */
  @HostListener('document:click', ['$event'])
  onDocumentClick(evt: Event) {
    const click = evt.target as HTMLElement;

    // Close language dropdown if clicked outside
    if (this.showLanguageMenu && this.langDropdown &&
        !this.langDropdown.nativeElement.contains(click)) {
      this.showLanguageMenu = false;
    }

    // Close settings dropdown if clicked outside
    if (this.showSettingsMenu && this.settingsDropdown &&
        !this.settingsDropdown.nativeElement.contains(click)) {
      this.showSettingsMenu = false;
    }
  }
}
