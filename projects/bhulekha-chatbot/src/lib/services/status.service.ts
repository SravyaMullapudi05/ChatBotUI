import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { CHATBOT_CONFIG } from '../config/chatbot-config.token';
import { ChatbotConfig } from '../config/chatbot-config';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private http: HttpClient,
    @Inject(CHATBOT_CONFIG) private config: ChatbotConfig
  ) {}

  getTicketStatus(
    appId: string | number,
    selectedModule: 'Application Status' | 'Grievance Status'
  ): Observable<any> {

    const baseUrl = this.config.apiBase;

    if (!baseUrl) {
      return throwError(() => new Error('CHATBOT_CONFIG.apiBase is missing'));
    }

    if (selectedModule === 'Application Status') {
      return this.http.get(
        `${baseUrl}ticket/v1/status/${appId}`
      );
    }

    if (selectedModule === 'Grievance Status') {
      return this.http.get(
        `${baseUrl}appadmin/user/status/${appId}`
      );
    }

    return throwError(() => new Error('Invalid module selected'));
  }
}
