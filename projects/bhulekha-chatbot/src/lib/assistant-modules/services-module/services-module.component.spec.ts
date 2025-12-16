import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesModuleComponent } from './services-module.component';

describe('ServicesModuleComponent', () => {
  let component: ServicesModuleComponent;
  let fixture: ComponentFixture<ServicesModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ServicesModuleComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
