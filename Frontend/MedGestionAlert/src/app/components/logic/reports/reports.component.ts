import { Component,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateReportsComponent } from './create-reports/create-reports.component';
export interface IReports {
    id: number;
    nombreProyecto: string;
    fase: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
}
@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
  standalone: false
})
export class ReportsComponent {
    displayedColumns: string[] = ['nombreProyecto', 'fase', 'fechaInicio', 'fechaFin', 'estado', 'options'];
    dataSource = new MatTableDataSource<IReports>();

    // 📌 Aquí está el CRUD en memoria
reports: IReports[] = [
  { 
    id: 1, 
    nombreProyecto: 'Proyecto A', 
    fase: 'Requerimientos', 
    fechaInicio: new Date(2025, 0, 10), 
    fechaFin: new Date(2025, 1, 5),       
    estado: 'Activo' 
  },
  { 
    id: 2, 
    nombreProyecto: 'Proyecto B', 
    fase: 'Desarrollo', 
    fechaInicio: new Date(2025, 2, 15),  
    fechaFin: new Date(2025, 5, 30),      
    estado: 'Inactivo' 
  },
  { 
    id: 3, 
    nombreProyecto: 'Proyecto C', 
    fase: 'Finalizado', 
    fechaInicio: new Date(2024, 8, 1),   
    fechaFin: new Date(2024, 11, 20),    
    estado: 'Activo' 
  },
];


    constructor(public dialog: MatDialog) {}

    ngOnInit() {
        this.loadReports();
    }

    loadReports() {
        this.dataSource.data = this.reports;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateReportsComponent, {
            data: { id: 0, nombreProyecto: '', fase: '', fechaInicio: null, fechaFin: null, estado: '' },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                result.id = this.reports.length + 1;
                this.reports.push(result);
                this.loadReports();
            }
        });
    }

    onUpdateProyect(proyect: IReports): void {
        const dialogRef = this.dialog.open(CreateReportsComponent, {
            data: { ...proyect },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const index = this.reports.findIndex(c => c.id === proyect.id);
                if (index !== -1) {
                    this.reports[index] = result;
                    this.loadReports();
                }
            }
        });
    }

    onDelete(id: number): void {
        this.reports = this.reports.filter(c => c.id !== id);
        this.loadReports();
    }
    
    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
