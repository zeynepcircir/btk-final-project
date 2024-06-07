import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AccountingEmployeesComponent } from './components/accounting-employees/accounting-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guard/auth.guard';
import { AccountingEmployeeService } from './services/accounting-employee.service';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent, LoginComponent, AccountingEmployeesComponent, EmployeeDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [AuthGuard,AccountingEmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
