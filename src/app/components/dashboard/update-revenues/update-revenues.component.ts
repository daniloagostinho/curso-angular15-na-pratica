import { DialogRef } from '@angular/cdk/dialog';
import { UpdateRevenues } from './../../../interfaces/updateRevenues';
import { Category } from './../../../interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-update-revenues',
  templateUrl: './update-revenues.component.html',
  styleUrls: ['./update-revenues.component.scss']
})
export class UpdateRevenuesComponent implements OnInit {
  form!: FormGroup;
  typeRevenue!: string;
  categories!: Category[];
  month!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  @Inject(DOCUMENT) private document: any,
  private localStorageService: LocalstorageService,
  private apiService: ApiService,
  private storeService: StoreService,
  private dialogRef: DialogRef<UpdateRevenuesComponent>) {

  }

  ngOnInit() {
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

    this.storeService.getStoreMonth().subscribe(res => {
      this.month = res;
    })
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

  submit() {
    const categoryInput = this.getValueControl(this.form, 'typeRevenue')

    if(!categoryInput) {
      this.form.patchValue({
        typeRevenue: this.typeRevenue
      })
    }

    if(this.isValidForm()) {
      let typeRevenue = this.getValueControl(this.form, 'typeRevenue')
      let value = this.getValueControl(this.form, 'value')
      let dateEntry = this.getValueControl(this.form, 'dateEntry')
      let user = this.localStorageService.getLocalStorage('user')

      const payload = {
        user: {
          title: user,
          month: {
            title: this.month,
            listMonth: {
              typeRevenue,
              value,
              dateEntry
            }
          }
        }
      }

      this.apiService.updateRevenues(this.data.data._id, payload)
        .subscribe((res: UpdateRevenues) => {
          if(res) {
            this.storeService.setStoreRevenues(true)
          }
        })
    }
    this.dialogRef.close()
  }

  getValueControl(form: FormGroup, control: string) {
    return form.controls[control].value;
  }

  isValidForm(): boolean {
    return this.form.valid;
  }

}
