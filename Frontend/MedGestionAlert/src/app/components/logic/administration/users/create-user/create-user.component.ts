import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IRol } from '@app/components/interfaces/rols.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DialogData } from '../users.component';
import { RolsService } from '@app/components/logic/services/rols.service';
import { UsersService } from '@app/components/logic/services/users.service';
import { IUser } from '@app/components/interfaces/users.interface';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css'],
    standalone: false
})
export class CreateUserComponent {

  formCrear!: FormGroup;
  private destroy$= new Subject<any>();
  roles!: any[];
  rols!:IRol;
  dataSource = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: FormBuilder,
    private rolSVC: RolsService,
    private UserSVC: UsersService,
  ) {}



  ngOnInit(): void {

    this.formCrear=this.fb.group({
      id: [0],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      rol: ['', Validators.required],
      passwordApp: ['', [Validators.required,
        Validators.pattern('((?:.*[A-Z]){1})((?:.*[a-z]){1})((?:.*[0-9]){1})((?:.*[!,@,#,$,%,^,&,*,?,_,~]){1})'),
        Validators.minLength(6)
      ] ],
      passwordApp2: ['', [Validators.required,
        Validators.pattern('((?:.*[A-Z]){1})((?:.*[a-z]){1})((?:.*[0-9]){1})((?:.*[!,@,#,$,%,^,&,*,?,_,~]){1})'),
        Validators.minLength(6)
      ] ],
      stateSession: ['', Validators.required]      
    });

    if (this.data) {
      console.log(this.data)
      this.formCrear = this.fb.group({
        id: [this.data.id],
        email: [this.data.email],
        userName: [this.data.userName],
        rol: [this.data.rol],
        passwordApp: [this.data.passwordApp],
        passwordApp2: [this.data.passwordApp],
        stateSession: [this.data.stateSession],
      });
    }

    this.rolSVC.getRol().subscribe( res=>{
      this.roles=res;

    })
  }


  getElement(id:number){
    this.UserSVC.getById(id).subscribe(res=>{
      this.formCrear.patchValue(res);
    })
  }

  onSave():void{
    const formValue= this.formCrear.value;
    console.log(formValue)
    if(formValue.id==0 || formValue.id==null){
      this.UserSVC.new(formValue).subscribe(res=>{
        this.clearForm();
      });
    }else{
      this.UserSVC.update(formValue.id, formValue).subscribe(res =>{
        console.log("se edito usuario => ",res);
        this.formCrear.reset();
        this.clearForm()
      });
      
    }
  }

  clearForm(): void {
    this.UserSVC.getAll().pipe(takeUntil(this.destroy$)).subscribe();
    setTimeout(() => {
      this.formCrear.reset();
      this.ngOnInit()
    }, 100)
  }

  onNoClick(): void {
    this.dialogRef.close();
  };
  
  getErrorMsje(field: string): [] | any {
    
    let msje;
    const fieldPassword = this.formCrear.value;
    const mensajes = [];

    if (fieldPassword.passwordApp !== fieldPassword.passwordApp2) {
      msje = 'Las contraseñas no coinciden';
      mensajes.push(msje);
    }

    if (this.formCrear.get(field)?.hasError('pattern')) {
      msje = 'Debe tener al menos: 1 letra mayúscula, 1 minúscula, 1 número';
      mensajes.push(msje);
    }
    return mensajes;
  }

  
  isValidField(field: string): boolean | any {
    let k = ((this.formCrear.get(field)?.touched || this.formCrear.get(field)?.dirty) && !this.formCrear.get(field)?.valid && this.formCrear.get(field)?.hasError('pattern') && this.formCrear.get(field)?.hasError('minlength'));
    return k;
  }

}
