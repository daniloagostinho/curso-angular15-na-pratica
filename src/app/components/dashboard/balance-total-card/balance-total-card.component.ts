import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-balance-total-card',
  templateUrl: './balance-total-card.component.html',
  styleUrls: ['./balance-total-card.component.scss']
})
export class BalanceTotalCardComponent implements OnInit {
  totalRevues!: number;
  totalDebts!: number;
  constructor(private storeService: StoreService) {}
  ngOnInit() {
    this.getRevenuesTotal();
  }

  getRevenuesTotal() {
    this.storeService.getRevenuesTotal().subscribe(res => {
      this.totalRevues = res;
      if(this.totalRevues !== null) {
        this.getDebtsTotal();
      }
    })
  }

  getDebtsTotal() {
    this.storeService.getDebtsTotal().subscribe(res => {
      this.totalDebts = res;
      if(this.totalDebts !== null) {
        this.getBalanceTotal();
      }
    })
  }

  getBalanceTotal() {
    this.storeService.getBalanceTotal().subscribe(res => {
      if(res) {
        console.log('res -->>', res)
      }
    })
  }
}
