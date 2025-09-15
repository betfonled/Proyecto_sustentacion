import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../components/interfaces/login.interface';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const us= localStorage.getItem('user') ?? '{}';
    const user:IAuthResponse= JSON.parse(us)|| null;
    const Token: string= user.token;

    let req=request;
    if(Token){
      req= request.clone({
        setHeaders:{
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'X-Request-With':'*',


          authorization:`Bearer ${Token}`
        }
      })
    }
    return next.handle(req);
  }
}
