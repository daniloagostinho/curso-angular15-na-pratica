import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHourComponent } from './message-hour.component';

describe('MessageHourComponent', () => {
  let component: MessageHourComponent;
  let fixture: ComponentFixture<MessageHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
