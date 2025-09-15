import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMinutesComponent } from '../create-minutes/create-minutes/create-minutes.component';

export interface IContract {
  id: number;
  nombre: string;
  tipoServicio: string;
  estado: string;
  descripcion: string;
}

@Component({
  selector: 'app-minutes',
  templateUrl: './minutes.component.html',
  styleUrl: './minutes.component.css',
  standalone: false
})
export class MinutesComponent {
 displayedColumns: string[] = ['nombre', 'tipoServicio', 'estado', 'descripcion', 'options'];
  dataSource = new MatTableDataSource<IContract>();

  // 📌 Aquí está el CRUD en memoria
  contracts: IContract[] = [
    { id: 1, nombre: 'Contrato A', tipoServicio: 'Soporte', estado: 'Activo', descripcion: 'Soporte nivel 1' },
    { id: 2, nombre: 'Contrato B', tipoServicio: 'Desarrollo', estado: 'En progreso', descripcion: 'App web interna' },
    { id: 3, nombre: 'Contrato C', tipoServicio: 'Implementación', estado: 'Finalizado', descripcion: 'ERP' },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.dataSource.data = this.contracts;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateMinutesComponent, {
      data: { id: 0, nombre: '', tipoServicio: '', estado: '', descripcion: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.contracts.length + 1;
        this.contracts.push(result);
        this.loadContracts();
      }
    });
  }

  onUpdateContract(contract: IContract): void {
    const dialogRef = this.dialog.open(CreateMinutesComponent, {
      data: { ...contract },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.contracts.findIndex(c => c.id === contract.id);
        if (index !== -1) {
          this.contracts[index] = result;
          this.loadContracts();
        }
      }
    });
  }

  onDelete(id: number): void {
    this.contracts = this.contracts.filter(c => c.id !== id);
    this.loadContracts();
  }
  
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
