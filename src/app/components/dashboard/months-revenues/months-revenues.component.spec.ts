import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsRevenuesComponent } from './months-revenues.component';

describe('MonthsRevenuesComponent', () => {
  let component: MonthsRevenuesComponent;
  let fixture: ComponentFixture<MonthsRevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsRevenuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthsRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
