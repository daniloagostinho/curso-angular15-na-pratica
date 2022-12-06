import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiService, private localStorageService: LocalstorageService) {}

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    const {_id} = this.localStorageService.getLocalStorage('userInfo')
    this.apiService.getUser(_id).subscribe()

  }
}
