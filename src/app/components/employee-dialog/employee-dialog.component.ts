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
      id: [data.employee?.id || null], 
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
      let employeeData = this.employeeForm.value;
      if (!employeeData.id) {  
        delete employeeData.id;  
      }
      console.log('Saving Employee:', employeeData);
      this.dialogRef.close(employeeData);
    } else {
      console.error('Form Errors:', this.listFormErrors());
    }
  }
  
  
  listFormErrors() {
    const errors: { [key: string]: any } = {}; 
    Object.keys(this.employeeForm.controls).forEach(key => {
      const controlErrors = this.employeeForm.get(key)?.errors; 
      if (controlErrors) {
          errors[key] = controlErrors;
      }
    });
    return errors;
  }
  



  close() {
    this.dialogRef.close();
  }
}
