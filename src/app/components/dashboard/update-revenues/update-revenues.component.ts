import { Category } from './../../../interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-update-revenues',
  templateUrl: './update-revenues.component.html',
  styleUrls: ['./update-revenues.component.scss']
})
export class UpdateRevenuesComponent implements OnInit {
  form!: FormGroup;
  typeRevenue!: string;
  categories!: Category[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  @Inject(DOCUMENT) private document: any,) {

  }

  ngOnInit() {
    console.log(this.data)
    this.initForm();
    this.fillData();
    this.preventFutureDate();

    this.categories = [
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
  }

  initForm() {
    this.form = this.fb.group({
      typeRevenue: [null, Validators.required],
      value: [null, Validators.required],
      dateEntry: [null, Validators.required],
    })
  }

  fillData() {
    if(this.data) {
      this.typeRevenue = this.data.data?.typeRevenue;
      this.form.patchValue({
        typeRevenue: this.data.data?.typeRevenue,
        value: this.data.data?.value,
        dateEntry: this.data.data?.dateEntry,
      })
    }
  }

  preventFutureDate() {
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
}
