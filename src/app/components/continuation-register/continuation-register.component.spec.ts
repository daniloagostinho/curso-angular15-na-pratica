import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuationRegisterComponent } from './continuation-register.component';

describe('ContinuationRegisterComponent', () => {
  let component: ContinuationRegisterComponent;
  let fixture: ComponentFixture<ContinuationRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuationRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
