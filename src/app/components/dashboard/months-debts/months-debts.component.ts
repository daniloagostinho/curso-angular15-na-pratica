import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-months-debts',
  templateUrl: './months-debts.component.html',
  styleUrls: ['./months-debts.component.scss']
})
export class MonthsDebtsComponent implements OnInit {
  month!: string;
  arrowLeft = '../../../../assets/images/arrow-left.png';
  arrowRight = '../../../../assets/images/arrow-right.png';
  i!: number;
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
    'Dezembro'
  ]
  constructor(private storeService: StoreService) {

  }

  ngOnInit() {
    this.getMonthCurrent();

    this.storeService.getDebtsPrev().subscribe(res => {
      if(res) {
        this.prevWithoutRevenues()
      }
    })

    this.storeService.getDebtsNext().subscribe(res => {
      if(res) {
        this.nextWithoutRevenues()
      }
    })
  }

  getMonthCurrent() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'})
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    this.month = letterDateString;
    this.storeService.setStoreMonth(this.month)
  }

  prev() {
    this.findIndexElement();
    this.i = this.i - 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchDebtsByMonth(true)
    this.storeService.setRevenuesPrev(true)
  }

  prevWithoutRevenues() {
    this.findIndexElement();
    this.i = this.i - 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchDebtsByMonth(true)
    this.storeService.setSearchRevenuesByMonth(true)
  }


  next() {
    this.findIndexElement();
    this.i = this.i + 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchDebtsByMonth(true)
    this.storeService.setRevenuesNext(true)
  }

  nextWithoutRevenues() {
    this.findIndexElement();
    this.i = this.i + 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchDebtsByMonth(true)
    this.storeService.setSearchRevenuesByMonth(true)
  }


  findIndexElement() {
    let returnIndex = this.months.findIndex(item => item === this.month)
    this.i = returnIndex;
  }

}
