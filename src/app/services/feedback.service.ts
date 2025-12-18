import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = `${environment.apiBase}`;

  constructor(private http: HttpClient) { }
  
  submitFeedBack(feedbackdata) {
      return this.http.get<any>(`${this.baseUrl}feedbacksubmit`);
  }
}
