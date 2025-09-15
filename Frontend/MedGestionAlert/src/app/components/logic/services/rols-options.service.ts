import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRolOption } from '@app/components/interfaces/rols-options.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolsOptionsService {

  constructor(private http: HttpClient) { }


  getGroupOption(idRol: number):Observable<IRolOption>{
    return this.http
    .get<IRolOption>(`${environment.API_URL}/api/RolOption/SearchGroupOptions?idRol=${idRol}`)
  }

  newRolOption(options:any):Observable<any>{
    return this.http.
    post<any>(`${environment.API_URL}/api/RolOption`, options);
  }

  updateRolOption(id:number, object:any):Observable<any>{
    return this.http
    .put<any>(`${environment.API_URL}/api/RolOption/${id}`, object);
  }

  deleteRolOption(id:number):Observable<any> {
    return this.http
    .delete<any>(`${environment.API_URL}/api/RolOption/${id}`);
  }

}
