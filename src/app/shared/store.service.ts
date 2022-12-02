import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeRegister = new BehaviorSubject<boolean>(false)
  private storeMonth = new BehaviorSubject<string>('')
  private searchRevenuesByMonth = new BehaviorSubject<boolean>(false)
  constructor() { }

  setStoreMonth(value: string) {
    this.storeMonth.next(value)
  }

  getStoreMonth() {
    return this.storeMonth.asObservable();
  }

  setStoreRevenues(value: boolean) {
    this.storeRegister.next(value)
  }
  getStoreRevenues() {
    return this.storeRegister.asObservable();
  }
  setSearchRevenuesByMonth(value: boolean) {
    this.searchRevenuesByMonth.next(value)
  }
  getSearchRevenuesByMonth() {
    return this.searchRevenuesByMonth.asObservable();
  }
}
