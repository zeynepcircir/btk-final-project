import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountingEmployeeService } from 'src/app/services/accounting-employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { AccountingEmployee } from '../models/accounting-employee';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accounting-employees',
  templateUrl: './accounting-employees.component.html',
  styleUrls: ['./accounting-employees.component.scss'],
})
export class AccountingEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'position', 'startDate', 'salary', 'performance', 'annualLeave', 'actions'];
  dataSource = new MatTableDataSource<AccountingEmployee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: AccountingEmployeeService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: AccountingEmployee[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addEmployee() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { employee: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  editEmployee(employee: AccountingEmployee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(emp => emp.id === result.id);
        this.dataSource.data[index] = result;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  deleteEmployee(id: number) {
    this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== id);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
