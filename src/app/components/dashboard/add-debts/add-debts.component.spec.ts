import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDebtsComponent } from './add-debts.component';

describe('AddDebtsComponent', () => {
  let component: AddDebtsComponent;
  let fixture: ComponentFixture<AddDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDebtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
