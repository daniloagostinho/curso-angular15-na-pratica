import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-debts-card',
  templateUrl: './debts-card.component.html',
  styleUrls: ['./debts-card.component.scss']
})
export class DebtsCardComponent implements OnInit {
  debtsTotal: any;
  constructor(private storeService: StoreService) {

  }
  ngOnInit() {
    this.getTotalDebts();
  }

  getTotalDebts() {
    this.storeService.getBalanceDebtsTotal().subscribe(res => {
      if(res) {
        this.storeService.setDebtsTotal(res.data.total)
        this.createDebts(res)
        this.storeService.setBalanceTotal(true);
      }
    })
  }

  createDebts(debt: any) {
    this.debtsTotal = {
      title: debt.data.title,
      value: debt.data.total
    }

    return this.debtsTotal;
  }
}
