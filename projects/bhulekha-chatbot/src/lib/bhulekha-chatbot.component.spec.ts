import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhulekhaChatbotComponent } from './bhulekha-chatbot.component';

describe('BhulekhaChatbotComponent', () => {
  let component: BhulekhaChatbotComponent;
  let fixture: ComponentFixture<BhulekhaChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BhulekhaChatbotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BhulekhaChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
