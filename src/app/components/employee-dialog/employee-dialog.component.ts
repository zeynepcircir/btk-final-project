import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountingEmployee } from '../models/accounting-employee';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: AccountingEmployee }
  ) {
    this.employeeForm = this.fb.group({
      id: [data.employee?.id || '', Validators.required],
      firstName: [data.employee?.firstName || '', Validators.required],
      lastName: [data.employee?.lastName || '', Validators.required],
      email: [data.employee?.email || '', [Validators.required, Validators.email]],
      position: [data.employee?.position || '', Validators.required],
      startDate: [data.employee?.startDate || '', Validators.required],
      salary: [data.employee?.salary || '', Validators.required],
      performanceReview: [data.employee?.performanceReview || '', Validators.required],
      annualLeave: [data.employee?.annualLeave || '', Validators.required],
    });
  }

  save() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
