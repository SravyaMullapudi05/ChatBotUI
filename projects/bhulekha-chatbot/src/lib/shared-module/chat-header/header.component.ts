import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lib-chat-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    // ✅ Angular Material MODULES only
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule
  ],
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(evt: Event) {
    const click = evt.target as HTMLElement;

    if (this.showLanguageMenu && this.langDropdown &&
      !this.langDropdown.nativeElement.contains(click)) {
      this.showLanguageMenu = false;
    }

    if (this.showSettingsMenu && this.settingsDropdown &&
      !this.settingsDropdown.nativeElement.contains(click)) {
      this.showSettingsMenu = false;
    }
  }
}
