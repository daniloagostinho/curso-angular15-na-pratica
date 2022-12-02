import { Category } from './../../../interfaces/category';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-debts',
  templateUrl: './update-debts.component.html',
  styleUrls: ['./update-debts.component.scss']
})
export class UpdateDebtsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  form!: FormGroup;
  category!: string;
  categories!: Category[];

  ngOnInit() {
    console.log(this.data)
    this.initForm();
    this.fillData();

    this.categories = [
      {
        name: 'Casa',
      },
      {
        name: 'Eletromesticos',
      },
      {
        name: 'Saúde',
      },
      {
        name: 'Entretenimento',
      },
      {
        name: 'Estudo',
      },
      {
        name: 'Outros',
      },
    ]
  }

  initForm() {
    this.form = this.fb.group({
      debt: [null, Validators.required],
      category: [null, Validators.required],
      value: [null, Validators.required],
      expirationDate: [null, Validators.required],
    })
  }

  fillData() {
    if(this.data) {
      this.category = this.data.data?.category;
      this.form.patchValue({
        debt: this.data.data?.debt,
        category: this.data.data?.category,
        value: this.data.data?.value,
        expirationDate: this.data.data?.expirationDate,
      })
    }
  }

  submit() {

  }
}
