import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '@app/components/interfaces/users.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CreateUserComponent } from '../../administration/users/create-user/create-user.component';
import { RolsService } from '../../services/rols.service';
import { UsersService } from '../../services/users.service';
import { IClient } from '@app/components/interfaces/load-information.interface';
import { CreateClientsComponent } from './create-clients/create-clients.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  standalone: false
})
export class ClientsComponent {

  animal!: string;
  name!: string;


  displayedColumns: string[] = ['name', 'email', 'telefono','direccion','proyecto', 'stateSession', 'options'];
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
  telefono:string = ""
  proyecto: string = ""
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
    const dialogRef = this.dialog.open(CreateClientsComponent, {
      data: { id: this.id ,email:this.email, userName:this.userName, 
        telefono:this.rol,direccion:this.passwordApp,proyecto:this.passwordApp,stateSession:this.stateSession, idRol:this.idRol},
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
      telefono: ['', Validators.required],
      direccion: ['', [Validators.required]],
      proyecto: ['', [Validators.required] ],
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

  onUpdateUsers(client: IClient):void{
    this.dialog.open(CreateUserComponent, {
      data: {id:client.id,email:client.email, userName:client.userName, 
            telefono:client.telefono,direccion:client.direccion,proyecto:client.proyecto, stateSession:client.stateSession, idRol:client.idRol},
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
