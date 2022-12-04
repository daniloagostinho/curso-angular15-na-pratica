import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AddDebtsComponent } from '../add-debts/add-debts.component';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ApiService } from 'src/app/services/api.service';
import { ListDebts } from 'src/app/interfaces/listDebts';
import { StoreService } from 'src/app/shared/store.service';
import { UpdateDebtsComponent } from '../update-debts/update-debts.component';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss']
})
export class DebtsComponent implements OnInit, AfterViewInit {
  user!: string;
  loading = false;
  emptyResult = false;
  arrDebts: any;
  totalDebts: any;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
  monthSelelected!: string;
  displayedColumns: string[] = [
    'divida',
    'categoria',
    'valor',
    'dataVencimento',
    '_id',
    'acoes'
  ]
  constructor(private dialog: MatDialog,
    private localStorageService: LocalstorageService,
    private apiService: ApiService,
    private storeService: StoreService) {

  }
  openDialog() {
    this.dialog.open(AddDebtsComponent, {
      width: '600px'
    })
  }
  ngOnInit() {
    this.defineInitMonth();
    this.storeService.getStoreMonth().subscribe(res => {
      this.monthSelelected = res;
    })

    this.storeService.getStoreDebts().subscribe(res => {
      if(res) {
        this.getRegisterDebts(this.monthSelelected)
      }
    })
  }

  ngAfterViewInit() {
    this.getRegisterDebts(this.monthSelelected)

    this.storeService.getSearchDebtsByMonth().subscribe(res => {
      if(res) {
        this.getRegisterDebts(this.monthSelelected)

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 3000);
      }
    })
  }

  getRegisterDebts(monthSelelected: string) {
    this.user = this.localStorageService.getLocalStorage('user')
    this.apiService.getRegisterDebts(monthSelelected, this.user)
    .subscribe((res: ListDebts) => {
      this.loading = true;

      let arr: any[] = [];

      if(res.result.length === 0) {
        this.emptyResult = true;
        this.arrDebts = []
        this.totalExpense();
      } else {
        this.emptyResult = false;
        this.arrDebts = arr;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 2001);
        res.result.forEach((element: any) => {
          arr.push(element.user.month.listMonth);
        })
        this.totalExpense();
      }

      setTimeout(() => {
        this.dataSource.data = arr;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }, 2000);

    })
  }

  defineInitMonth() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'})
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    this.monthSelelected ==  undefined ? (this.monthSelelected = letterDateString) : this.monthSelelected
  }

  applyFilter(event: any) {
    const filesValues = (event.target as HTMLInputElement).value
    this.dataSource.filter = filesValues.trim().toLocaleLowerCase();
  }

  selectAction(action: string, element: any) {
    if(action.indexOf('edit.png') != -1) {
      this.dialog.open(UpdateDebtsComponent, {
        width: '600px',
        data: {
          data: element
        }
      })
    } else {
      const question = confirm('Tem certeza que deseja excluir essa Receita?')

      if(question) {
        this.apiService.deleteDebts(element._id)
          .subscribe((res: any) => {
            if(res) {
              this.storeService.setStoreDebts(true)
            }
          })
      }
    }
  }


  generateTotalExpenseArray() {
    let total = this.arrDebts.map((total: any) => Number(total.value))
    return total;
  }

  totalExpense() {
    let totalArr = this.generateTotalExpenseArray();

    this.totalDebts = totalArr.reduce((total: any, num: any) => total + num, 0)

    const dataBalanceDebts = {
      data: {
        title: 'Total Dívidas',
        total: this.totalDebts
      }
    }

    this.storeService.setBalanceDebtsTotal(dataBalanceDebts)

  }
}

