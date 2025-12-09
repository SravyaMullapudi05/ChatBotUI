import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantModulesComponent } from './assistant-modules.component';

describe('AssistantModulesComponent', () => {
  let component: AssistantModulesComponent;
  let fixture: ComponentFixture<AssistantModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
