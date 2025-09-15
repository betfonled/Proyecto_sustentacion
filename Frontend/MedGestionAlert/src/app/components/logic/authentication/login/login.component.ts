import { Component, OnDestroy, OnInit } from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ILogin } from 'src/app/components/interfaces/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {
  //Declaracion de variables
  private subscription: Subscription = new Subscription();
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
      private snackBar: MatSnackBar
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  hide = true;

  getErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl!.hasError('required')) {
      return 'Ingrese el correo electronico';
    }

    return emailControl!.hasError('email')
      ? 'Elcorreo electronico no es valido'
      : '';
  }

  ngOnInit(): void {
    //Aqui vamos a hacer el llamado de la version
    /* this.AuthSVC.version().subscribe(res=>{
      this.version = res;
    })*/
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onLogin():void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const formValue: ILogin = { // Asegura que formValue sea del tipo ILogin
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    this.subscription.add(
      this.loginService.login(formValue).pipe(
        timeout(5000)
      ).subscribe({
        next:(res) => {
          this.loading = false;
        if (res) {
          this.router.navigate(['/home']);
        }
      },
      error:() => {
        this.loading = false;
        this.snackBar.open('No se pudo conectar con el servidor. Verifique la conexión o intente más tarde.',
          'Cerrar',
          {
            duration: 10000, // 10 segundos
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
      }
    })
    );
  }
}
