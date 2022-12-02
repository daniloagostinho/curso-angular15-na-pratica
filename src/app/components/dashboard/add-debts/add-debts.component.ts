import { Category } from './../../../interfaces/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-debts',
  templateUrl: './add-debts.component.html',
  styleUrls: ['./add-debts.component.scss']
})

export class AddDebtsComponent implements OnInit {
  form!: FormGroup;
  category!: string;
  categories!: Category[];
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();

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
      exprirateDate: [null, Validators.required],
      fixeDebt: [null],
    })
  }

  submit() {
    console.log(this.form)
  }
}
