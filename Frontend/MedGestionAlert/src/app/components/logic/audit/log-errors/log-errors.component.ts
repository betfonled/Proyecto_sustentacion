import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '@app/components/interfaces/users.interface';
import { Subject, Subscription } from 'rxjs';
import { LogErrorsService } from '../../services/log-errors.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
    selector: 'app-log-errors',
    templateUrl: './log-errors.component.html',
    styleUrls: ['./log-errors.component.css'],
    standalone: false
})
export class LogErrorsComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns: string[] = ['id', 'fecha', 'error', 'description'];
    dataSource = new MatTableDataSource();
    private destroy$ = new Subject<any>();
    roles!: any[];

      private MOCK_LOGS = [
    { id: 1, fecha: '2025-09-14 10:20:00', error: 'NullPointerException', descripcion: 'Referencia nula en el módulo de clientes' },
    { id: 2, fecha: '2025-09-13 15:45:00', error: 'TimeoutError', descripcion: 'Tiempo de espera agotado en conexión a BD' },
    { id: 3, fecha: '2025-09-12 09:10:00', error: 'Unauthorized', descripcion: 'Acceso no autorizado a recurso protegido' },
    { id: 4, fecha: '2025-09-11 17:30:00', error: 'ValidationError', descripcion: 'El campo email es obligatorio' }
  ];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    timeInterval!: Subscription;
    user!: IUser;
    id: number = 0;
    email: string = ""
    userName: string = ""
    rol: string = ""
    passwordApp: string = ""
    stateSession: string = ""
    idRol: number = 0;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    constructor(private LogErrorsSVC: LogErrorsService,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) { }

      form!: FormGroup;

    ngOnInit(): void {

            this.dataSource.data = this.MOCK_LOGS;
        //this.getLogError();
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

    private getLogError(): void {
        this.LogErrorsSVC.getAll().subscribe(res => {
            this.dataSource.data = res;
        });
    }

    getElement(id: number) {
        this.LogErrorsSVC.getById(id).subscribe(res => {
            this.form.patchValue(res);
        })
    }

    exportExcel(): void {
    // ✅ convertir los datos actuales del dataSource en un array
    const dataToExport = this.dataSource.data.map((log: any) => ({
      Id: log.id,
      Fecha: log.fecha,
      Error: log.error,
      Descripcion: log.descripcion
    }));

    // ✅ crear una hoja Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

    // ✅ crear el libro
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Logs': worksheet },
      SheetNames: ['Logs']
    };

    // ✅ exportar a binario
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // ✅ guardar con file-saver
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'log-errores.xlsx');
  }
}
