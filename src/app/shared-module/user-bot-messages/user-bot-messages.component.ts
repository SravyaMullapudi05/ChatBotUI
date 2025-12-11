import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage } from 'src/app/chat-modal/chat-modal.component';

@Component({
  selector: 'app-user-bot-messages',
  templateUrl: './user-bot-messages.component.html',
  styleUrls: ['./user-bot-messages.component.css']
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
