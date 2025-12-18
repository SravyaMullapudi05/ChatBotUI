import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bot-message-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './bot-message-feedback.component.html',
  styleUrl: './bot-message-feedback.component.css'
})
export class BotMessageFeedbackComponent {

  constructor(private feedBackService: FeedbackService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {

  }

  @Input() visible = false;
  @Input() type: 'up' | 'down' | null = null;
  @Input() message: any;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  selectedRating: number | null = null;
  feedbackText = '';

  feedbackTags = [
    'Information was complete',
    'Response was too good',
    'No technical issue / Bug',
    'Understood properly',
    'Positive and good information'
  ];

  closeModal() {
    this.emptyall()
    this.close.emit();
  }

  submitFeedback() {
    var feedBackdata = {
      type: this.type,
      rating: this.selectedRating,
      text: this.feedbackText,
      message: this.message,
      tags: this.selectedTags
    }
    this.feedBackService.submitFeedBack(feedBackdata)

    // // ✅ THANK YOU NOTIFICATION
    // this.snackBar.open(
    //   'Thank you for your feedback!',
    //   'Close',
    //   {
    //     duration: 30000,
    //     horizontalPosition: 'right',
    //     verticalPosition: 'top',
    //     panelClass: ['feedback-snackbar']
    //   }
    // );

    this.notificationService.show(
      'Thank you for your feedback!',
      'success'
    );

    this.submit.emit(feedBackdata);
    this.emptyall()
  }

  emptyall() {
    this.type = null;
    this.selectedRating = null;
    this.feedbackText = '';
    this.message = null;
    this.selectedTags = [];
  }

  isRatingDisabled(value: number): boolean {
    if (this.type === 'up') {
      // Positive → disable 1–5
      return value <= 5;
    }

    if (this.type === 'down') {
      // Negative → disable 6–10
      return value >= 6;
    }

    return false;
  }

  selectRating(value: number) {
    if (this.isRatingDisabled(value)) return;
    this.selectedRating = value;
  }

  selectedTags: string[] = [];

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);

    if (index > -1) {
      this.selectedTags.splice(index, 1); // unselect
    } else {
      this.selectedTags.push(tag); // select
    }
  }

}
