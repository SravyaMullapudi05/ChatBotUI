import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css'],
  standalone: true,
  imports: [FormsModule, MatIconButton, MatIcon,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule
  ],
})
export class ChatFooterComponent {

  newMessage: string = '';

  @Output() sendMessageEvent = new EventEmitter<string>();
  @Output() emojiClickEvent = new EventEmitter<void>();

  sendMessage() {
    const msg = this.newMessage.trim();
    if (!msg) return;

    this.sendMessageEvent.emit(msg);
    this.newMessage = '';
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
