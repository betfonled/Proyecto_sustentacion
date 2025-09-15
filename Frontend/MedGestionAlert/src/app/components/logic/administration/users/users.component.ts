import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/components/interfaces/users.interface';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { RolsService } from '../../services/rols.service';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { IRol } from '@app/components/interfaces/rols.interface';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    standalone: false
})

export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  animal!: string;
  name!: string;


  displayedColumns: string[] = ['name', 'email', 'rol', 'stateSession', 'options'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  roles!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  timeInterval!: Subscription;
  user!: IUser;
  id: number=0;
  email: string=""
  userName:string=""
  rol: string=""
  passwordApp: string=""
  stateSession: string=""
  idRol: number=0;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  constructor(private UserSVC: UsersService,
    private rolSVC: RolsService,
    private fb: FormBuilder,
    public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { id: this.id ,email:this.email, userName:this.userName, 
        rol:this.rol,passwordApp:this.passwordApp,stateSession:this.stateSession, idRol:this.idRol},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clearForm();
    });
  }



  form!: FormGroup;


  ngOnInit() {
    this.getUser();

    this.form = this.fb.group({
      id: [0],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      rol: ['', Validators.required],
      passwordApp: ['', [Validators.required,
      Validators.pattern('((?:.*[A-Z]){1})((?:.*[a-z]){1})((?:.*[0-9]){1})((?:.*[!,@,#,$,%,^,&,*,?,_,~]){1})'),
      Validators.minLength(6)
      ]],
      passwordApp2: ['', [Validators.required,
        Validators.pattern('((?:.*[A-Z]){1})((?:.*[a-z]){1})((?:.*[0-9]){1})((?:.*[!,@,#,$,%,^,&,*,?,_,~]){1})'),
        Validators.minLength(6)
      ] ],
      stateSession: ['', Validators.required]
    });

    this.rolSVC.getRol().subscribe(res => {
      this.roles = res;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.timeInterval?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getUser(): void {
    this.UserSVC.getAll().subscribe(res => {
        this.dataSource.data= res;
      });
  }

  getElement(id: number) {
    this.UserSVC.getById(id).subscribe(res => {
      this.form.patchValue(res);
    })
  }

  onUpdateUsers(user: IUser):void{
    this.dialog.open(CreateUserComponent, {
      data: {id:user.id,email:user.email, userName:user.userName, 
            rol:user.rol,passwordApp:user.passwordApp,passwordApp2:user.passwordApp, stateSession:user.stateSession, idRol:user.idRol},
    });
   }

  onDelete(id: number): void {
    this.UserSVC.delete(id).subscribe(res => {
      console.log('se elimino ', res)
      setTimeout(() => {
        this.getUser();

        this.clearForm();
      }, 2500)
    })


  }


  clearForm(): void {
    this.UserSVC.getAll().pipe(takeUntil(this.destroy$)).subscribe();
    setTimeout(() => {
      this.form.reset();
      this.ngOnInit()
    }, 100)
  }



  isValidField(field: string): boolean | any {
    let k = ((this.form.get(field)?.touched || this.form.get(field)?.dirty) && !this.form.get(field)?.valid && this.form.get(field)?.hasError('pattern') && this.form.get(field)?.hasError('minlength'));
    return k;
  }


}