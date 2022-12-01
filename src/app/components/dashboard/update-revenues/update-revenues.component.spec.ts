import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRevenuesComponent } from './update-revenues.component';

describe('UpdateRevenuesComponent', () => {
  let component: UpdateRevenuesComponent;
  let fixture: ComponentFixture<UpdateRevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRevenuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
