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
  hasPositive = true;
  hasNegative = true;
  balanceTotalMinus: any;
  showBalanceTotal: any;
  balanceTotalPlus: any;
  balanceTotalZero: any;
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
        if(this.totalDebtLessThanIncome()) {
          const result = Number(this.totalDebts) - Number(this.totalRevues)
          this.hasPositive = true;
          this.hasNegative = false;
          this.setDebtMinusIncome(result)
        } else if(this.totalDebtGreaterThanIcome()) {
          const result = Number(this.totalDebts) - Number(this.totalRevues)
          this.hasNegative = true;
          this.hasPositive = false;
          this.setDebtPlusIncome(result)
        } else if(this.totalEqualsZero()) {
          this.hasNegative = false;
          this.hasPositive = false;
          this.setBalanceZero();
        }
      }

    })
  }

  setBalanceZero() {
    this.balanceTotalZero = {
      title: 'Saldo Total',
      value: 0
    }

    this.showBalanceTotal = this.balanceTotalZero;
  }

  setDebtMinusIncome(result: number) {
    this.balanceTotalMinus = {
      title: 'Saldo Total',
      value: Math.abs(result)
    }

    this.showBalanceTotal = this.balanceTotalMinus;
    console.log(this.showBalanceTotal)
  }

  setDebtPlusIncome(result: any) {
    this.balanceTotalPlus = {
      title: 'Saldo Total',
      value: -Math.abs(result)
    }

    this.showBalanceTotal = this.balanceTotalPlus;
  }
  totalDebtGreaterThanIcome() {
    if(this.totalDebts > this.totalRevues) {
      return true;
    } else {
      return false;
    }
  }

  totalDebtLessThanIncome() {
    if(this.totalDebts < this.totalRevues) {
      return true;
    } else {
      return false;
    }
  }


  totalEqualsZero() {
    if(this.totalDebts === 0 && this.totalRevues === 0) {
      return true;
    } else {
      return false
    }
  }



}
