import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsDebtsComponent } from './months-debts.component';

describe('MonthsDebtsComponent', () => {
  let component: MonthsDebtsComponent;
  let fixture: ComponentFixture<MonthsDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsDebtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthsDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
