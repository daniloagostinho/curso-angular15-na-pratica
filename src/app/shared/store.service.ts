import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeRegisterRevenues = new BehaviorSubject<boolean>(false)
  private storeRegisterDebts = new BehaviorSubject<boolean>(false)
  private storeMonth = new BehaviorSubject<string>('')
  private searchRevenuesByMonth = new BehaviorSubject<boolean>(false)
  private searchDebtsByMonth = new BehaviorSubject<boolean>(false)
  constructor() { }

  setStoreMonth(value: string) {
    this.storeMonth.next(value)
  }

  getStoreMonth() {
    return this.storeMonth.asObservable();
  }

  setStoreRevenues(value: boolean) {
    this.storeRegisterRevenues.next(value)
  }
  getStoreRevenues() {
    return this.storeRegisterRevenues.asObservable();
  }

  setStoreDebts(value: boolean) {
    this.storeRegisterDebts.next(value)
  }
  getStoreDebts() {
    return this.storeRegisterDebts.asObservable();
  }
  setSearchRevenuesByMonth(value: boolean) {
    this.searchRevenuesByMonth.next(value)
  }
  getSearchRevenuesByMonth() {
    return this.searchRevenuesByMonth.asObservable();
  }
  setSearchDebtsByMonth(value: boolean) {
    this.searchDebtsByMonth.next(value)
  }
  getSearchDebtsByMonth() {
    return this.searchDebtsByMonth.asObservable();
  }
}
