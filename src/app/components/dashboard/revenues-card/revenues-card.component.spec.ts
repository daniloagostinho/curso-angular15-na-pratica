import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuesCardComponent } from './revenues-card.component';

describe('RevenuesCardComponent', () => {
  let component: RevenuesCardComponent;
  let fixture: ComponentFixture<RevenuesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenuesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
