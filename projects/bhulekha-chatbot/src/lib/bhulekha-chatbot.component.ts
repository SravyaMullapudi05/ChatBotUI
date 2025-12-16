import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModalComponent } from './chat-modal/chat-modal.component';

@Component({
  selector: 'lib-bhulekha-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    ChatModalComponent
  ],
  template: `<lib-chat-modal></lib-chat-modal>`
})
export class BhulekhaChatbotComponent {}
