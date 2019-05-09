import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor (private sharedService: SharedService) {}
  
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.sharedService.loading(true);
    const type = "application/json; charset=utf-8";
    const headers = new HttpHeaders({
      'Content-Type': type,
      'Accept': 'text/html, application/json, text/plain, multipart/form-data, */*'
    });
    
    const copy = req.clone({
      withCredentials: true,
      headers: headers
    });
    
    return next.handle(copy).do(event => {
      if (event['status']) {
        this.sharedService.loading(false);
      }
    });
  }
}