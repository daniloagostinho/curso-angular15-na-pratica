import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeRegister = new BehaviorSubject<boolean>(false)
  private storeMonth = new BehaviorSubject<string>('')
  constructor() { }

  setStoreMonth(value: string) {
    this.storeMonth.next(value)
  }

  getStoreMonth() {
    return this.storeMonth.asObservable();
  }

  setStoreRegisterRevenues(value: boolean) {
    this.storeRegister.next(value)
  }
  getStoreRegisterRevenues() {
    return this.storeRegister.asObservable();
  }
}
