import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTotalCardComponent } from './balance-total-card.component';

describe('BalanceTotalCardComponent', () => {
  let component: BalanceTotalCardComponent;
  let fixture: ComponentFixture<BalanceTotalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTotalCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceTotalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
