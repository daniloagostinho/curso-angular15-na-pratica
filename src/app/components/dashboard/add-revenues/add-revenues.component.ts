import { RegisterRevenues } from './../../../interfaces/registerRevenues';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Category } from './../../../interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StoreService } from 'src/app/shared/store.service';
import { ApiService } from 'src/app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-revenues',
  templateUrl: './add-revenues.component.html',
  styleUrls: ['./add-revenues.component.scss']
})
export class AddRevenuesComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  typeRevenue!: string;
  revenues!: Category[];
  month!: string;
  months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: any,
    private localStorageService: LocalstorageService,
    private storeService: StoreService,
    private apiService: ApiService,
    private dialogRef: DialogRef<AddRevenuesComponent>) {

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
    this.storeService.getStoreMonth()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.month = res;
    })
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

    if(this.isValidForm()) {
      let typeRevenue = this.getValueControl(this.form, 'typeRevenue');
      let value = this.getValueControl(this.form, 'value');
      let user = this.localStorageService.getLocalStorage('user')

      const date = this.getValueControl(this.form, 'dateEntry')


      const dataReplace = date
        .replaceAll('-', '$')
        .replaceAll(' ', '$')
        .split('$')

      let fixedMonth = Number(dataReplace[1] - 1)
      let newDate = new Date(dataReplace[0], fixedMonth, dataReplace[2])

      const monthDateSelected = newDate.toLocaleDateString('pt-br', {
        month: 'long'
      })

      const convertUppercase = monthDateSelected[0].toUpperCase() + monthDateSelected.substring(1)

      let indexMonthCurrent = this.searchIndexMonth(convertUppercase)
      let dateEntry = new Date(dataReplace[0], indexMonthCurrent, dataReplace[2])

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
      if(this.getValueControl(this.form, 'fixedRevenue')) {
        for(let i = 0; i < this.months.length; i++) {
          dateEntry = new Date(dataReplace[0], this.searchIndexMonth(this.months[i]), dataReplace[2])

          const payload = {
            user: {
              title: user,
              month: {
                title: this.months[i],
                listMonth: {
                  typeRevenue,
                  value,
                  dateEntry
                }
              }
            }
          }

          this.apiService.registerRevenues(payload).subscribe()
        }

        this.storeService.setStoreRevenues(true)
        this.dialogRef.close();
        return;
      }

      this.apiService.registerRevenues(payload)
        .subscribe((res: RegisterRevenues) => {
          if(res) {
            this.storeService.setStoreRevenues(true)
          }
        })

        this.dialogRef.close();
    }
  }

  isValidForm() {
    return this.form.valid;
  }

  getValueControl(form: FormGroup, control: string) {
    return form.controls[control].value;
  }


  searchIndexMonth(monthSearch: any) {
    let index = this.months.findIndex((month) => {
      return month === monthSearch;
    })

    return index;
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}
