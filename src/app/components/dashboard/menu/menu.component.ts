import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  messageHour!: string;
  showNameUser!: string;

  constructor(private localStorageService: LocalstorageService) {

  }

  ngOnInit() {
    this.getNameUser();
  }

  getMessageHour(message: string) {
    this.messageHour = message;
  }

  getNameUser() {
    const nameUser = this.localStorageService.getLocalStorage('userInfo')
    this.showNameUser = nameUser.name;
  }
}
