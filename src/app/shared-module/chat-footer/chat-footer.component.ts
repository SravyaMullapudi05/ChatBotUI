import { Component, EventEmitter, Output, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ChatFooterComponent {

  newMessage = '';
  isListening = false;
  micPermissionDenied = false;
  isSpeechSupported = false;

  private recognition: any;
  private recognitionActive = false;
  private starting = false;

  @Output() sendMessageEvent = new EventEmitter<{
    senttype: string;
    text: string;
  }>();

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef,private apiService: ApiService) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported');
      return;
    }

    this.isSpeechSupported = true;
    this.recognition = new SpeechRecognition();

    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    // Mic really started
    this.recognition.onaudiostart = () => {
      this.zone.run(() => {
        this.isListening = true;
        this.recognitionActive = true;
        this.starting = false;
      });
    };

    // Mic really stopped
    this.recognition.onaudioend = () => {
      this.zone.run(() => {
        this.isListening = false;
        this.recognitionActive = false;
        this.starting = false;
      });
    };

    this.recognition.onresult = (event: any) => {
      this.zone.run(() => {
        if (event) {
          this.newMessage = event.results[0][0].transcript;
          this.cdr.detectChanges();
          this.isListening = false;
          this.starting = false;
        }
      });
    };

    this.recognition.onerror = (event: any) => {
      this.zone.run(() => {
        this.isListening = false;
        this.recognitionActive = false;
        this.starting = false;

        if (
          event.error === 'not-allowed' ||
          event.error === 'service-not-allowed'
        ) {
          this.micPermissionDenied = true;
        }
      });
    };

    this.recognition.onend = () => {
      this.zone.run(() => {
        this.isListening = false;
        this.recognitionActive = false;
        this.starting = false;
      });
    };
  }

  private getSpeechLang(): string {
    const lang = this.apiService.getLanguage()
    console.log(lang)
    return lang === 'hi' ? 'hi-IN' : 'en-IN';
  }

  toggleMic() {
    if (!this.isSpeechSupported || !this.recognition) return;

    // STOP
    if (this.recognitionActive || this.starting) {
      try {
        this.recognition.stop();
        this.zone.run(() => {
          this.isListening = false;
          this.starting = false;
        });
      } catch { }
      return;
    }

    // START
    try {
      this.zone.run(() => {
        this.micPermissionDenied = false;
        this.recognition.lang = this.getSpeechLang();
        this.starting = true;
        this.isListening = true;
      });
      this.recognition.start();
    } catch {
      this.zone.run(() => {
        this.starting = false;
        this.isListening = false;
      });
    }
  }

  sendMessage() {
    const msg = this.newMessage.trim();
    if (!msg) return;
    this.newMessage = '';
    this.sendMessageEvent.emit({
      senttype: 'usersent',
      text: msg
    });
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
