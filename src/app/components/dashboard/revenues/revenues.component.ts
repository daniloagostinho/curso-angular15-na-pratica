import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';
import { AddRevenuesComponent } from '../add-revenues/add-revenues.component';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent implements OnInit {
  monthSelelected!: string;
  user!: string;
  constructor(private dialog: MatDialog,
    private storeService: StoreService,
    private localStorageService: LocalstorageService,
    private apiService: ApiService) {

  }

  ngOnInit() {
    this.storeService.getStoreRegisterRevenues().subscribe(res => {
      console.log('res -->> ', res)
      if(res) {
        this.getRegisterRevenues(this.monthSelelected)
      }
    })

    this.storeService.getStoreMonth().subscribe(res => {
      this.monthSelelected = res;
    })
  }

  getRegisterRevenues(monthSelelected: string) {
    this.user = this.localStorageService.getLocalStorage('user')
    this.apiService.getRegisterRevenues(monthSelelected, this.user).subscribe(res => console.log(res))
  }

  openDialog() {
    this.dialog.open(AddRevenuesComponent, {
      width: '600px',
      autoFocus: false,
      data: {
        any: ''
      }
    })
  }
}
