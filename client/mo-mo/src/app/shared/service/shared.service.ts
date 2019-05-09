import { Injectable } from "@angular/core";
import { HttpRequest, HttpClient } from '@angular/common/http';
import HttpList from '../HttpList';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiHttp = 'http://localhost:3000/';
  private subHttp = HttpList;
  private loader: boolean = false;

  constructor (private httpClient: HttpClient) {}

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


}