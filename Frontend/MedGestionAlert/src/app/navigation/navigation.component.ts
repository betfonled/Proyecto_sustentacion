import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAuthResponse } from '@app/components/interfaces/login.interface';
import { LoginService } from '@app/components/logic/services/login.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: false
})
export class NavigationComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject<any>();
  selectRoute!: string;
  isLogged=false;
  token=0;
  
  constructor(
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: IAuthResponse) => {
        this.isLogged = !this.isLogged;
        this.isLogged;
        if (user) {
          this.token = user.token?.length;
        } else {
          this.token = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  sendRoute(url: string): void {
    const urlarray = url.split('/');
    const ruta = urlarray[urlarray.length - 1];
    this.selectRoute = ruta;
    localStorage.setItem('route', this.selectRoute);
  }

  onLogout(): void {
    this.loginService.logout();
    location.reload();
  }
}
