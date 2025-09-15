import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { IAuthResponse, ILogin } from '../../interfaces/login.interface';
import { environment } from '@env/environment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get user$() {
    return this.user.asObservable();
  }
  
  login(authData?: ILogin): Observable<IAuthResponse | void> {
    return this.http
      .post<IAuthResponse>(`${environment.API_URL}/api/Auth/login`, authData)
      .pipe(
        map((user: IAuthResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        })
      );
  }


  private saveLocalStorage(user: IAuthResponse): void {

    localStorage.setItem('user', JSON.stringify(user));
    

    //Esta parte es para las opciones por rol 
    /*this.rolSVC.searchByName(user.rol).subscribe(rol=>{
      let objRol=rol
      this.rolSVC.getGroupRolOpt(objRol?.numId).subscribe(opt=>{
        let resopt=opt;
        localStorage.setItem('access', JSON.stringify(resopt))
      })
    });*/
  }


  logout():void{
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('route');
    this.user.next(false);
    //TODO property userIslogged=false
    this.router.navigate(['/login']);
  }


  private checkToken():void{
    const us= localStorage.getItem('user') ?? '{}';
    const user = JSON.parse(us)|| null;
    if(user){
      const isExpired= helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

}
