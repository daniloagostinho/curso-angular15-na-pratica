import { Router } from '@angular/router';
import { DownloadImage } from './../../../interfaces/downloadImage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  messageHour!: string;
  showNameUser!: string;
  isDefaultImage = '../../../../assets/images/default.png'
  imageUser!: SafeResourceUrl;
  constructor(private localStorageService: LocalstorageService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router) {

  }

  ngOnInit() {
    this.getNameUser();
    this.getImageUser();
  }

  getImageUser() {
    const nameImage = this.localStorageService.getLocalStorage('userInfo')
    this.apiService.downloadImage(nameImage.image).subscribe((res: DownloadImage) => {
      let url = 'data:image/jpg;base64,' + res.image;
      this.imageUser = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    })
  }
  getMessageHour(message: string) {
    this.messageHour = message;
  }

  getNameUser() {
    const nameUser = this.localStorageService.getLocalStorage('userInfo')
    this.showNameUser = nameUser.name;
  }

  logout() {
    this.localStorageService.removeLocalStorage('token')
    this.router.navigate(['/'])
  }
}
