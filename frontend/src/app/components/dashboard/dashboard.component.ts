import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';

// Interface for the expected finance data
interface FinanceDetails {
  budget: number;
  totalRevenue: number;
  totalSalaries: number;
  profit: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  budget: number = 0;
  totalRevenue: number = 0;
  totalSalaries: number = 0;
  profit: number = 0;
  userData: any;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient, private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true;

    // Step 1: Check authentication
    this.http.get('http://localhost:3000/api/dashboard', { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.userData = res;
        console.log('Authenticated user:', this.userData);

        // Step 2: Fetch finance details
        this.api.getFinanceDetails().subscribe({
          next: (data: FinanceDetails) => {
            this.budget = data.budget;
            this.totalRevenue = data.totalRevenue;
            this.totalSalaries = data.totalSalaries;
            this.profit = data.profit;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching finance data:', err);
            this.errorMessage = 'Error loading finance data.';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('User auth failed:', err);
        this.errorMessage = err.error?.message || 'Authentication failed.';
        this.loading = false;
      }
    });
  }
}
