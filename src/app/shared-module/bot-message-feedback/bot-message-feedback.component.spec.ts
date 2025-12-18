import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMessageFeedbackComponent } from './bot-message-feedback.component';

describe('BotMessageFeedbackComponent', () => {
  let component: BotMessageFeedbackComponent;
  let fixture: ComponentFixture<BotMessageFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotMessageFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotMessageFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
