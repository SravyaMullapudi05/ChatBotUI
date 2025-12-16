import { InjectionToken } from '@angular/core';
import { ChatbotConfig } from './chatbot-config';

export const CHATBOT_CONFIG =
  new InjectionToken<ChatbotConfig>('CHATBOT_CONFIG');
