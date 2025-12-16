import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBotMessagesComponent } from './user-bot-messages.component';

describe('UserBotMessagesComponent', () => {
  let component: UserBotMessagesComponent;
  let fixture: ComponentFixture<UserBotMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UserBotMessagesComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBotMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
