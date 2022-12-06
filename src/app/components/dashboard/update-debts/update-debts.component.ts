import { DialogRef } from '@angular/cdk/dialog';
import { UpdateDebts } from './../../../interfaces/updateDebts';
import { Category } from './../../../interfaces/category';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-debts',
  templateUrl: './update-debts.component.html',
  styleUrls: ['./update-debts.component.scss']
})
export class UpdateDebtsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalstorageService,
    private storeService: StoreService,
    private apiService: ApiService,
    private dialogRef: DialogRef<UpdateDebtsComponent>) {

  }
  form!: FormGroup;
  category!: string;
  categories!: Category[];
  month!: string;

  ngOnInit() {
    this.initForm();
    this.fillData();
    this.defineInitMonth();

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

    this.storeService.getStoreMonth().subscribe(res => {
      this.month = res;
    })
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
    const categoryInput = this.getValueControl(this.form, 'category')

    if(!categoryInput) {
      this.form.patchValue({
        category: this.category
      })
    }

    if(this.isValidForm()) {
      let debt = this.getValueControl(this.form, 'debt')
      let category = this.getValueControl(this.form, 'category')
      let value = this.getValueControl(this.form, 'value')
      let expirationDate = this.getValueControl(this.form, 'expirationDate')
      let user = this.localStorageService.getLocalStorage('user')

      const payload = {
        user: {
          title: user,
          month: {
            title: this.month,
            listMonth: {
              debt,
              category,
              value,
              expirationDate
            }
          }
        }
      }

      this.apiService.updateDebts(this.data.data._id, payload)
        .subscribe((res: UpdateDebts) => {
          if(res) {
            this.storeService.setStoreDebts(true)
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

  defineInitMonth() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'})
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    this.month ==  undefined ? (this.month = letterDateString) : this.month
  }

}
