import { ListDebts } from './../interfaces/listDebts';
import { RegisterDebts } from './../interfaces/registerDebts';
import { UpdateRevenues } from './../interfaces/updateRevenues';
import { RegisterRevenues } from './../interfaces/registerRevenues';
import { RegisterUser } from './../interfaces/registerUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, retry, throwError } from 'rxjs';
import { enviremonent } from 'src/enviremonents/enviremonent';
import { UtilsService } from './utils.service';
import { LoginUser } from '../interfaces/loginUser';
import { DownloadImage } from '../interfaces/downloadImage';
import { ListRevenues } from '../interfaces/listRevenues';
import { DeleteRevenues } from '../interfaces/deleteRevenues';
import { UpdateDebts } from '../interfaces/updateDebts';
import { DeleteDebts } from '../interfaces/deleteDebts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
    private utilsService: UtilsService) { }

  registerUser(user: any): Observable<RegisterUser> {

    const formData = new FormData();

    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('age', user.age)
    formData.append('image', user.image)
    formData.append('password', user.password)
    formData.append('confirmPassword', user.confirmPassword)

    return this.httpClient.post<RegisterUser>(enviremonent.BASE_URL + '/auth/register/user', formData)
    .pipe(
      catchError((err) => {
        if(err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
        } else if(err.status === 404) {
          this.utilsService.showError(err.error.message)
        } else {
          this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
        }
        return throwError(() => err)
      })
    )

  }

  loginUser(user: any): Observable<LoginUser> {

    return this.httpClient.post<LoginUser>(enviremonent.BASE_URL + '/auth/login', user)
      .pipe(
        retry(2),
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )
  }

  downloadImage(imgName: string): Observable<DownloadImage> {
    const headers = new HttpHeaders().set('imgName', imgName)

    return this.httpClient.get<DownloadImage>(enviremonent.BASE_URL + '/download/image', {headers: headers})
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )

  }

  registerRevenues(revenue: any): Observable<RegisterRevenues> {
    return this.httpClient.post<RegisterRevenues>(enviremonent.BASE_URL + '/auth/revenues', revenue)
      .pipe(
        catchError((err) => {
          return throwError(() => err)
        })
      )

  }

  getRegisterRevenues(param: any, user: any): Observable<ListRevenues> {
    let headers = new HttpHeaders()
    headers = headers.set('month', param).set('user', user)

    return this.httpClient.get<ListRevenues>(enviremonent.BASE_URL + '/list/revenues', {headers: headers})
      .pipe(
        first(),
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )
  }

  deleteRevenues(id: string): Observable<DeleteRevenues> {
    return this.httpClient.delete<DeleteRevenues>(enviremonent.BASE_URL + '/delete/revenue/' + id)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )
  }

  updateRevenues(id: string, payload: any): Observable<UpdateRevenues> {
    return this.httpClient.put<UpdateRevenues>(enviremonent.BASE_URL + '/update/revenues/' + id, payload)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {

            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )
  }

  registerDebts(debt: any): Observable<RegisterDebts> {
    return this.httpClient.post<RegisterDebts>(enviremonent.BASE_URL + '/auth/debts', debt)
      .pipe(
        catchError((err) => {
          return throwError(() => err)
        })
      )

  }

  getRegisterDebts(param: any, user: any): Observable<ListDebts> {
    let headers = new HttpHeaders()
    headers = headers.set('month', param).set('user', user)

    return this.httpClient.get<ListDebts>(enviremonent.BASE_URL + '/list/debts', {headers: headers})
      .pipe(
        first(),

        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )
  }


  updateDebts(id: string, payload: any): Observable<UpdateDebts> {
    return this.httpClient.put<UpdateDebts>(enviremonent.BASE_URL + '/update/debts/' + id, payload)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {

            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)

          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })
      )
  }

  deleteDebts(id: string): Observable<DeleteDebts> {
    return this.httpClient.delete<DeleteDebts>(enviremonent.BASE_URL + '/delete/debt/' + id)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })

      )
  }

  getUser(id: string): Observable<any> {
    return this.httpClient.get<any>(enviremonent.BASE_URL + '/user/' + id)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message)
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!')
          }
          return throwError(() => err)
        })

      )
  }
}
