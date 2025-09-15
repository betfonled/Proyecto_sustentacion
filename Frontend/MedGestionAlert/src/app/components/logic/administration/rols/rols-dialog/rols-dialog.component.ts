import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRol } from '@app/components/interfaces/rols.interface';
import { RolsService } from '@app/components/logic/services/rols.service';
import { Subject, takeUntil } from 'rxjs';
import { DialogData } from '../../users/users.component';


@Component({
    selector: 'app-rols-dialog',
    templateUrl: './rols-dialog.component.html',
    styleUrls: ['./rols-dialog.component.css'],
    standalone: false
})
export class RolsDialogComponent implements OnInit{
  form!: FormGroup;
  private destroy$ = new Subject<any>();
  
  constructor(
    public dialogRef: MatDialogRef<RolsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRol,
    private fb: FormBuilder,
    private rolService: RolsService
  ){}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      id:[0],
      nameRol:['', Validators.required],
    })

    if (this.data) {
      console.log(this.data)
      this.form = this.fb.group({
        id: [this.data.id],
        nameRol: [this.data.nameRol],
      });
    }
  }

  onSave():void{
    const formValue = this.form.value;

    if(formValue.id==0){
      this.rolService.newRol(formValue).subscribe(res =>{
        console.log("se crea un nuevo rol => ",res);
        this.clearForm();
      });
    }else{
      this.rolService.update(formValue.id, formValue).subscribe(res =>{
        console.log("se edito el rol => ",res);
        this.clearForm();
      });
    }
   
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  };

  clearForm():void{
    this.rolService.getRol().pipe( takeUntil(this.destroy$)).subscribe();

   setTimeout(()=>{
     this.form.reset();
   },100)
 }
 

}
