import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  employees: any[] = [];
  today: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    // Get employees
    this.api.getEmployees().subscribe(data => {
      this.employees = data;
    });

    // Set today's date in YYYY-MM-DD format
    const date = new Date();
    this.today = date.toISOString().split('T')[0];
  }

  paySalary(id: string) {
    this.api.paySalary(id).subscribe(() => {
      alert('Salary paid!');
    });
  }
}

