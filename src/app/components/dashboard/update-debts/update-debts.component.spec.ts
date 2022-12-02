import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDebtsComponent } from './update-debts.component';

describe('UpdateDebtsComponent', () => {
  let component: UpdateDebtsComponent;
  let fixture: ComponentFixture<UpdateDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDebtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
