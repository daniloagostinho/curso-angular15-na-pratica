import { Category } from './../../../interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add-revenues',
  templateUrl: './add-revenues.component.html',
  styleUrls: ['./add-revenues.component.scss']
})
export class AddRevenuesComponent implements OnInit {
  form!: FormGroup;
  typeRevenue!: string;
  revenues!: Category[];
  constructor(private fb: FormBuilder, @Inject(DOCUMENT) private document: any) {

  }

  ngOnInit() {
    this.initForm();

    this.revenues = [
      {
        name: 'Investimento'
      },
      {
        name: 'Outros'
      },
      {
        name: 'Férias'
      },
      {
        name: '13 Sálario'
      },
      {
        name: 'PLR'
      },
      {
        name: 'Aposentaria'
      },
      {
        name: 'Aluguel'
      },
      {
        name: 'Salario'
      }
    ]

    this.preventFutureDate();
  }

  initForm() {
    this.form = this.fb.group({
      typeRevenue: [null, Validators.required],
      value: [null, Validators.required],
      dateEntry: [null, Validators.required],
      fixedRevenue: [null],
    })
  }

  preventFutureDate() {
    debugger;
    const inputDate = this.document.querySelector('#dateEntry')

    let date = new Date();

    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    let year = date.getFullYear();

    if(month < 10) {
      month = '0' + month.toString()
    }

    if(day < 10) {
      day = '0' + day.toString();
    }

    let maxDate = year + '-' + month + '-' + day;

    inputDate.max = maxDate;
  }

  submit() {
    this.form.patchValue({
      typeRevenue: this.typeRevenue
    })
    console.log(this.form)
  }
}
