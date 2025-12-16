import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgFor, NgClass, NgIf, CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { ChatMessage } from '../../chat-modal/chat-modal.component';
import { HeaderComponent } from '../chat-header/header.component';

@Component({
  selector: 'app-user-bot-messages',
  templateUrl: './user-bot-messages.component.html',
  styleUrls: ['./user-bot-messages.component.css'],
  standalone: true,
  imports: [NgFor, NgClass, NgIf, MatIcon,
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
    ChatFooterComponent,
    HeaderComponent
  ],
})
export class UserBotMessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input() messages: ChatMessage[] = [];
  @Output() messageClicked = new EventEmitter<ChatMessage>();

  trackByMessageId(index: number, msg: ChatMessage): string {
    return msg.id;
  }

  formatTimestamp(date: Date): string {
    const h = date.getHours();
    const m = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hh = h % 12 || 12;
    const mm = m < 10 ? `0${m}` : m;
    return `${hh}:${mm} ${ampm}`;
  }

  onMessageClick(message: ChatMessage) {
    this.messageClicked.emit(message);
  }

}
