import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuesComponent } from './revenues.component';

describe('RevenuesComponent', () => {
  let component: RevenuesComponent;
  let fixture: ComponentFixture<RevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
