import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-months-revenues',
  templateUrl: './months-revenues.component.html',
  styleUrls: ['./months-revenues.component.scss']
})
export class MonthsRevenuesComponent implements OnInit {
  month!: string;
  arrowLeft = '../../../../assets/images/arrow-left.png';
  arrowRight = '../../../../assets/images/arrow-right.png';
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
  i!: number;
  constructor(private storeService: StoreService) {

  }

  ngOnInit() {
    this.getMonthCurrent();

    this.storeService.getRevenuesPrev().subscribe(res => {
      if(res) {
        this.prevWithoutDebts();
      }
    })

    this.storeService.getRevenuesNext().subscribe(res => {
      if(res) {
        this.nextWithoutDebts();
      }
    })
  }
  findIndexElement() {
    let returnIndex = this.months.findIndex(item => item === this.month)
    this.i = returnIndex;
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
    this.storeService.setSearchRevenuesByMonth(true)
    this.storeService.setSearchDebtsByMonth(true)
    this.storeService.setDebtsPrev(true)
  }

  prevWithoutDebts() {
    this.findIndexElement();
    this.i = this.i - 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchRevenuesByMonth(true)
    this.storeService.setSearchDebtsByMonth(true)
  }


  next() {
    this.findIndexElement();
    this.i = this.i + 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchRevenuesByMonth(true)
    this.storeService.setDebtsNext(true)
  }

  nextWithoutDebts() {
    this.findIndexElement();
    this.i = this.i + 1;
    this.i = this.i % this.months.length;
    this.month = this.months[this.i]
    this.storeService.setStoreMonth(this.months[this.i])
    this.storeService.setSearchRevenuesByMonth(true)
    this.storeService.setSearchDebtsByMonth(true)
  }
}
