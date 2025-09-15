import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-reports',
  templateUrl: './create-reports.component.html',
  styleUrl: './create-reports.component.css',
  standalone: false
})
export class CreateReportsComponent {
form: FormGroup;

constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data.id],
      nombreProyecto: [data.nombreProyecto, Validators.required],
      fase: [data.fase, Validators.required],
      fechaInicio: [data.fechaInicio, Validators.required],
      fechaFin: [data.fechaFin, Validators.required],
      estado: [data.estado, Validators.required],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
