import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
 
import { HeaderComponent } from '../chat-header/header.component';
import { UserBotMessagesComponent } from '../user-bot-messages/user-bot-messages.component';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css'],
  standalone: true,
  imports: [FormsModule, MatIconButton, MatIcon,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
 
    MatSidenavModule,
    MatDialogModule,
    OverlayModule,
    MatMenuModule,
    UserBotMessagesComponent,
    HeaderComponent
  ],
})
export class ChatFooterComponent {
 
  newMessage: string = '';
 micClick=false;
  @Output() sendMessageEvent = new EventEmitter<{
    senttype: string;
    text: string;
  }>();
  @Output() emojiClickEvent = new EventEmitter<void>();
 
  sendMessage() {
    const msg = this.newMessage.trim();
     this.newMessage = '';
    if (!msg) return;
 
    this.sendMessageEvent.emit({
      senttype: 'usersent',
      text: msg
    });
   
  }
 
  onEmojiClick() {
    this.emojiClickEvent.emit();
  }
 
  autoResizeTextArea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
 
  onEnterPress(event: KeyboardEvent): void {
    if (!event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
 
 