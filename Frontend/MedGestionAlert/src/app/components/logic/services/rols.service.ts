import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IRol } from '../../interfaces/rols.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolsService {

  constructor(private http: HttpClient) { }

  getRol(): Observable<IRol[]> {
    return this.http
      .get<IRol[]>(`${environment.API_URL}/api/Rol`)
  }

  getRolId(id:number):Observable<IRol>{
    return this.http
    .get<IRol>(`${environment.API_URL}/api/Rol/${id}`)
  }

  newRol(rol:IRol):Observable<IRol>{
    return this.http.post<IRol>(`${environment.API_URL}/api/Rol`, rol)
  }

  delete(Id: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/api/Rol/${Id}`)
  }

  update(id: number, rol: IRol): Observable<any>{
    return this.http.put<IRol>(`${environment.API_URL}/api/Rol/${id}`, rol)
  }

  getRolForName(nameRol: string): Observable<IRol>{
    return this.http.get<IRol>(`${environment.API_URL}/api/Rol/search/${nameRol}`)
  }
}
