
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-minutes',
  templateUrl: './create-minutes.component.html',
  styleUrl: './create-minutes.component.css',
  standalone: false
})
export class CreateMinutesComponent {
form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateMinutesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      tipoServicio: [data.tipoServicio, Validators.required],
      estado: [data.estado, Validators.required],
      descripcion: [data.descripcion],
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
