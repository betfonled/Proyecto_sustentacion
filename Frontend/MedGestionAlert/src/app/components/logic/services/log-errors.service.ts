import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ILogError, ILogErrorResponse } from '../../interfaces/log.interface';

@Injectable({
  providedIn: 'root'
})
export class LogErrorsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/LogError`)
  }
  getById(Id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/LogError/${Id}`)
  }
  
  new(logs: ILogError): Observable<any> {
    return this.http
      .post<ILogError>(`${environment.API_URL}/api/LogError`, logs)
  }
}
