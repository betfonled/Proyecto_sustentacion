import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '@app/components/interfaces/load-information.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/User`)
  }

  getById(Id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/User/${Id}`)
  }


  new(user: IClient): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/api/User`, user)
  }

  update(userId: number, user: IClient): Observable<IClient> {
    return this.http
      .put<IClient>(`${environment.API_URL}/api/User/${userId}`, user)
  }

  delete(id: number): Observable<{}> {
    return this.http
      .delete<IClient>(`${environment.API_URL}/api/User/${id}`)
  }

}
