import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IOption, IOptionCheck } from '../../interfaces/options.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private http: HttpClient) { }

  getOption(): Observable<IOptionCheck[]> {
    return this.http
      .get<IOptionCheck[]>(`${environment.API_URL}/api/Option`)
  }

  
}
