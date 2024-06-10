import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AccountingEmployeeService } from 'src/app/services/accounting-employee.service';
import { AccountingEmployee } from '../models/accounting-employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  genderCounts = { male: 0, female: 0 };
  totalAnnualLeaves = 0;
  averageSalary = 0;
  performanceMetrics = {
    excellent: 0,
    good: 0,
    average: 0,
    belowAverage: 0,
    poor: 0,
  };

  constructor(private employeeService: AccountingEmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.calculateMetrics(employees);
      this.createGenderChart(employees);
      this.createLeaveChart(employees);
      this.createSalaryChart(employees);
      this.createPerformanceChart(employees);
    });
  }

  calculateMetrics(employees: AccountingEmployee[]) {
    employees.forEach((emp) => {
      if (['John', 'David', 'Russell'].includes(emp.firstName)) {
        this.genderCounts.male++;
      } else {
        this.genderCounts.female++;
      }
      this.totalAnnualLeaves += emp.annualLeave;
      this.averageSalary += emp.salary;

      const reviewKey =
        emp.performanceReview.toLowerCase() as keyof typeof this.performanceMetrics;
      if (reviewKey in this.performanceMetrics) {
        this.performanceMetrics[reviewKey]++;
      }
    });
    this.averageSalary /= employees.length;
  }

  createPerformanceChart(employees: AccountingEmployee[]) {
    const labels = employees.map((emp) => emp.firstName);
    const data = employees.map((emp) => {
      switch (emp.performanceReview) {
        case 'Excellent':
          return 5;
        case 'Good':
          return 4;
        case 'Average':
          return 3;
        case 'Below Average':
          return 2;
        case 'Poor':
          return 1;
        default:
          return 0;
      }
    });

    const ctx = document.getElementById(
      'performanceChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Performance',
            data: data,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
          },
        ],
      },
    });
  }

  createLeaveChart(employees: AccountingEmployee[]) {
    const labels = employees.map((emp) => emp.firstName);
    const data = employees.map((emp) => emp.annualLeave);

    const ctx = document.getElementById('leaveChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Annual Leave',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      },
    });
  }

  createSalaryChart(employees: AccountingEmployee[]) {
    const labels = employees.map((emp) => emp.firstName);
    const data = employees.map((emp) => emp.salary);

    const ctx = document.getElementById('salaryChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Salary',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }

  createGenderChart(employees: AccountingEmployee[]) {
    const genderCounts = { male: 0, female: 0 };
    employees.forEach((emp) => {
      if (['John', 'David', 'Russell'].includes(emp.firstName))
        genderCounts.male++;
      else genderCounts.female++;
    });

    const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [genderCounts.male, genderCounts.female],
            backgroundColor: ['blue', 'pink'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            hoverBorderColor: 'white',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'black',
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            enabled: true,
            mode: 'point',
            bodyFont: {
              size: 16,
            },
            callbacks: {
              label: function (tooltipItem) {
                let label = tooltipItem.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.parsed * 100) / 100;
                return label;
              },
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }
}
