import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css']
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
