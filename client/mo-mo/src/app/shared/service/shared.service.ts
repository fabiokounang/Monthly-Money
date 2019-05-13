import { Injectable } from "@angular/core";
import { HttpRequest, HttpClient } from '@angular/common/http';
import HttpList from '../HttpList';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiHttp = 'http://localhost:3000/';
  private subHttp = HttpList;
  private loader: boolean = false;
  interval: any = null;
  
  constructor (private httpClient: HttpClient, private router: Router, private snack: MatSnackBar) {}

  connection(header: string, subHttp: string, data: any = {}, query: string = '') {
    const req = new HttpRequest(header, this.apiHttp + this.subHttp[subHttp].endpoint + query + '?time=' + new Date().getTime(), data); // request ke database ex: http://example.com/master/bank/api + query params(jika ada), data(jika ada)
    return this.httpClient.request(req); // return hasil dari http request
  }

  loading (condition) {
    this.loader = condition;
  }

  loaderVar () {
    return this.loader;
  }

  isAuthenticate () {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  checkRunTimeToken (expirationDate) {
    let expirationTime = expirationDate.getTime() ;
    this.interval = setInterval(() => {
      let newTime = new Date().getTime();
      if (expirationTime - newTime <= 0) {
        this.router.navigate(['/']);
        this.callSnack('Your session has expired !', 'Okay');
        this.clearAuthData();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  callSnack(text, action) {
    this.snack.open(text, action, {
      duration: 3000
    })
  }

  saveAuthData (token: string, expirationDate: Date, userId: string, expiresIn) { // SAVE TOKEN AND EXPIRATION DATE TO LOCALSTORAGE
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString()); // to string karena value local storage hanya bisa menerima string
    localStorage.setItem('expiresIn', expiresIn); // to string karena value local storage hanya bisa menerima string
  }

  clearAuthData () {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
    localStorage.removeItem('expiresIn');
    clearInterval(this.interval);
  }


}