import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRol } from '@app/components/interfaces/rols.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { RolsService } from '../../services/rols.service';
import { RolsDialogComponent } from './rols-dialog/rols-dialog.component';
import {
  IOption,
  IOptionCheck,
} from '@app/components/interfaces/options.interface';
import { OptionsService } from '../../services/options.service';
import { RolsOptionsService } from '../../services/rols-options.service';
import { IRolOption } from '@app/components/interfaces/rols-options.interface';

@Component({
    selector: 'app-rols',
    templateUrl: './rols.component.html',
    styleUrls: ['./rols.component.css', '../../../../../styles.css'],
    standalone: false
})
export class RolsComponent implements OnInit {
  displayedColumns: string[] = ['rol', 'option-buttons'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  roles!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  timeInterval!: Subscription;
  rol!: IRol;
  form!: FormGroup;
  optionsItems: IOptionCheck[] = [];
  optionCheck: IOption[] = [];
  objectRolOption: IRolOption = { rol: { id: 0, nameRol: '' }, option: [] };
  id: number = 0;
  nameRol: string = '';
  rolOption: any;
  top = false;

  constructor(
    private rolService: RolsService,
    private optionService: OptionsService,
    private rolsOptionsService: RolsOptionsService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [0],
      nameRol: [''],
    });
    this.getRol();
    this.getOption();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RolsDialogComponent, {
      data: { id: this.id, nameRol: this.nameRol },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.clearForm();
    });
  }

  getElement(id: number) {
    this.clearForm();

    this.rolService.getRolId(id).subscribe((res) => {
      this.rol = res;
      setTimeout(() => {
        if (this.rol !== undefined) {
          this.form.patchValue(res);
        }
        this.rolsOptionsService.getGroupOption(id).subscribe((res) => {
          this.objectRolOption = res;
          this.rolOption = res;

          // if (res['option'].length == 0) {
          //   this.clearForm();
          // } else {
            this.optionCheck = this.rolOption.option;

            this.optionCheck.forEach((e) => {
              this.optionsItems.forEach((y) => {
                if (e.id == y.id) {
                  y.check = !this.top;
                }
              });
            });
          // }
        });
      }, 100);

      // aqui
    });
  }

  private getRol(): void {
    this.rolService.getRol().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  private getOption(): void {
    this.optionService.getOption().subscribe((res) => {
      this.optionsItems = res;
    });
  }

  clearForm(): void {
    this.rolService.getRol().pipe(takeUntil(this.destroy$)).subscribe();

    setTimeout(() => {
      this.ngOnInit();
    }, 100);

    this.optionsItems.forEach(e=>{
      if(e.check){
        e.check=false;
      }
    });
  }

  onDelete(id: number): void {
    this.rolService.delete(id).subscribe((res) => {
      console.log('se elimino ', res);
      setTimeout(() => {
        this.clearForm();
      }, 2500);
    });
  }

  onUpdateRol(rol: IRol): void {
    this.dialog.open(RolsDialogComponent, {
      data: { id: rol.id, nameRol: rol.nameRol },
    });
  }

  rolsOptions(e: IOption): void {
    let i = 0;
    let swich: boolean = false;

    this.objectRolOption.option.forEach((y) => {
      if (e.id == y.id) {
        this.objectRolOption.option.splice(i, 1);
        swich = true;
        this.top = !this.top;
      }
      i++;
    });

    if (!swich) {
      let objOption = {
        id: e.id,
        optionName: e.optionName,
        idFather: e.idFather,
      };
      this.objectRolOption.option.push(objOption);
      this.top != this.top;
    }
  }

  saveRolOption(): void {
    const formValue = this.form.value;
    if (formValue.id == 0) {
      if (this.objectRolOption.option.length == 0) {
        console.log('debe agregar las opciones');
      } else {
        this.rolService.getRolForName(formValue.nameRol).subscribe((res) => {
          this.objectRolOption.rol = res;

          this.rolsOptionsService
            .newRolOption(this.objectRolOption)
            .subscribe((res) => {
              this.form.reset();
              this.clearForm();
              console.log('Se guardo correctamente');
            });
        });
      }
    }else{
      this.rolsOptionsService.updateRolOption(formValue.id, this.objectRolOption).subscribe(res=>{
        this.form.patchValue(res);
        this.top=false;
        console.log("Se actualizo correctamente");
      })
    }
    this.clearForm();
  }

  deleteRolOption(){

    const formValue = this.form.value;

    this.rolsOptionsService.deleteRolOption(formValue.id).subscribe(res=>{
      console.log(res);
      this.clearForm();
    })

  }
}
