import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountingEmployeeService } from 'src/app/services/accounting-employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { AccountingEmployee } from '../models/accounting-employee';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-accounting-employees',
  templateUrl: './accounting-employees.component.html',
  styleUrls: ['./accounting-employees.component.scss'],
})
export class AccountingEmployeesComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id', 'name', 'email', 'position', 'startDate', 'salary', 'performance', 'annualLeave', 'actions'];
  dataSource = new MatTableDataSource<AccountingEmployee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: AccountingEmployeeService, private router: Router, public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
    });
  }


addEmployee() {
  const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { employee: null }
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.employeeService.addEmployee(result).subscribe(data => {
              this.dataSource.data = data;
              this.refreshTable(); 
          });
      }
  });
}

applyFilter(event: Event) {
  const inputElement = event.target as HTMLInputElement;  
  const filterValue = inputElement.value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: "Are you sure you want to delete this employee?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.refreshTable();
        });
      }
    });
  }

  refreshTable() {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
