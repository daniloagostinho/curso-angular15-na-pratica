import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListRevenues } from 'src/app/interfaces/listRevenues';
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
  loading = false;
  emptyResult = false;
  arrRevenues: any[] = [];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
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
    this.apiService.getRegisterRevenues(monthSelelected, this.user)
    .subscribe((res: ListRevenues) => {
      this.loading = true;

      let arr: any[] = [];

      if(res.result.length === 0) {
        this.emptyResult = true;

        this.arrRevenues = []
      } else {
        this.emptyResult = false;
        this.arrRevenues = arr;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 2001);
        res.result.forEach((element: any) => {
          arr.push(element.user.month.listMonth);
        })
      }

      setTimeout(() => {
        this.dataSource.data = arr;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }, 2000);

    })
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
