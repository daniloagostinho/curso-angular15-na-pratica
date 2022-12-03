import { DeleteRevenues } from './../../../interfaces/deleteRevenues';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListRevenues } from 'src/app/interfaces/listRevenues';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';
import { AddRevenuesComponent } from '../add-revenues/add-revenues.component';
import { UpdateRevenuesComponent } from '../update-revenues/update-revenues.component';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent implements OnInit, AfterViewInit {
  monthSelelected!: string;
  user!: string;
  loading = false;
  emptyResult = false;
  arrRevenues: any[] = [];
  public dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'tipoReceita',
    'valor',
    'dataEntrada',
    '_id',
    'acoes'
  ]
  @ViewChild('paginator') paginator!: MatPaginator;
  totalRevenues: any;
  constructor(private dialog: MatDialog,
    private storeService: StoreService,
    private localStorageService: LocalstorageService,
    private apiService: ApiService) {

  }

  ngOnInit() {
    this.defineInitMonth();
    this.storeService.getStoreRevenues().subscribe(res => {
      if(res) {
        this.getRegisterRevenues(this.monthSelelected)
      }
    })
  }

  ngAfterViewInit() {
    this.storeService.getStoreMonth().subscribe(res => {
      this.monthSelelected = res;
    })
    this.getRegisterRevenues(this.monthSelelected);

    this.storeService.getSearchRevenuesByMonth().subscribe(res => {
      if(res) {
        this.getRegisterRevenues(this.monthSelelected)
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 3000);
      }
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
        this.totalExpense();
      } else {
        this.emptyResult = false;
        this.arrRevenues = arr;

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

  openDialog() {
    this.dialog.open(AddRevenuesComponent, {
      width: '600px',
      autoFocus: false,
      data: {
        any: ''
      }
    })
  }

  applyFilter(event: any) {
    const filterValues = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValues.trim().toLocaleLowerCase();
  }

  selectAction(action: string, element: any) {
    if(action.indexOf('edit.png') != -1) {
      this.dialog.open(UpdateRevenuesComponent, {
        width: '600px',
        data: {
          data: element
        }
      })
    } else {
      const question = confirm('Tem certeza que deseja excluir essa Receita?')

      if(question) {
        this.apiService.deleteRevenues(element._id)
          .subscribe((res: DeleteRevenues) => {
            if(res) {
              this.storeService.setStoreRevenues(true)
            }
          })
      }
    }
  }

  defineInitMonth() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'})
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    this.monthSelelected ==  undefined ? (this.monthSelelected = letterDateString) : this.monthSelelected
  }

  generateTotalExpenseArray() {
    let total = this.arrRevenues.map(total => Number(total.value))
    return total;
  }

  totalExpense() {
    let totalArr = this.generateTotalExpenseArray();

    this.totalRevenues = totalArr.reduce((total, num) => total + num, 0)

    const dataBalanceRevenues = {
      data: {
        title: 'Total Receitas',
        total: this.totalRevenues
      }
    }

    this.storeService.setBalanceRevenuesTotal(dataBalanceRevenues)

  }

}
