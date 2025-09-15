import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, IUserResponse } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/User`)
  }

  getById(Id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/User/${Id}`)
  }


  new(user: IUser): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/api/User`, user)
  }

  update(userId: number, user: IUser): Observable<IUser> {
    return this.http
      .put<IUser>(`${environment.API_URL}/api/User/${userId}`, user)
  }

  delete(id: number): Observable<{}> {
    return this.http
      .delete<IUser>(`${environment.API_URL}/api/User/${id}`)
  }

  
}
