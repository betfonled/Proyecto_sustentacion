import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
    selector: 'app-log-process',
    templateUrl: './log-process.component.html',
    styleUrls: ['./log-process.component.css'],
    standalone: false
})
export class LogProcessComponent {
displayedColumns: string[] = ['id', 'fecha', 'proceso', 'estado', 'descripcion'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadMockData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private loadMockData(): void {
    const mockData = [
      { id: 1, fecha: '14/09/2025 09:30', proceso: 'Carga de datos', estado: 'Finalizado', descripcion: 'Carga completa de archivo CSV' },
      { id: 2, fecha: '13/09/2025 16:10', proceso: 'Generación de reportes', estado: 'En progreso', descripcion: 'Generando reportes de auditoría' },
      { id: 3, fecha: '12/09/2025 12:00', proceso: 'Respaldo', estado: 'Error', descripcion: 'Error en conexión al servidor de respaldo' },
      { id: 4, fecha: '11/09/2025 08:45', proceso: 'Sincronización', estado: 'Finalizado', descripcion: 'Sincronización exitosa con servidor externo' },
    ];
    this.dataSource.data = mockData;
  }

  downloadExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LogProcesos');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'log_procesos.xlsx');
  }
}
