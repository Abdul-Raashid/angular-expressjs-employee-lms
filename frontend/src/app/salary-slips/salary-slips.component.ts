import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  // Import ApiService
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salary-slips',
  imports: [CommonModule],
  templateUrl: './salary-slips.component.html',
  styleUrls: ['./salary-slips.component.scss']
})
export class SalarySlipsComponent implements OnInit {
  salarySlips: any[] = [];  // Array to store salary slip data
  isLoading: boolean = true;  // Flag to show loading state
  errorMessage: string = '';  // Error message for any issues with the API call

  constructor(private apiService: ApiService, private router: Router) {}  // Inject Router here

  ngOnInit() {
    this.getSalarySlips();  // Fetch salary slips when the component is initialized
  }

  getSalarySlips() {
    this.apiService.getSalarySlips().subscribe(
      (data: any[]) => {
        this.salarySlips = data;  // Store the data in the salarySlips array
        this.isLoading = false;  // Hide loading indicator
      },
      (error) => {
        console.error('Error fetching salary slips:', error);  // Log the error
        this.errorMessage = 'Failed to load salary slips. Please try again later.';  // Show error message
        this.isLoading = false;  // Hide loading indicator
      }
    );
  }

  goBack() {
    this.router.navigate(['/trainer-dashboard']);  // Navigate back to the trainer dashboard or any other page
  }
}
