import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification" *ngIf="notification$ | async as n"
         [class.success]="n.type === 'success'"
         [class.error]="n.type === 'error'"
         [class.info]="n.type === 'info'">
      {{ n.message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notification$ = this.notificationService.notification$;
  constructor(private notificationService: NotificationService) {}
}
