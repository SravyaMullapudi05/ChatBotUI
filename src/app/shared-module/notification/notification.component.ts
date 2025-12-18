import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notification$ = this.notificationService.notification$;
  constructor(private notificationService: NotificationService) { }
}
