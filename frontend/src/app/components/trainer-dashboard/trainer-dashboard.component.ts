import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/trainer-dashboard.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']
})
export class TrainerDashboardComponent implements OnInit {
  earningsSummary: any = {};
  recentBatches: any[] = [];
  recentInvoices: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.getEarningsSummary().subscribe(data => this.earningsSummary = data);
    this.dashboardService.getRecentBatches().subscribe(data => this.recentBatches = data);
    this.dashboardService.getRecentInvoices().subscribe(data => this.recentInvoices = data);
  }

  viewSalarySlips() {
    this.router.navigate(['/salary-slips']);
  }

  viewAllInvoices() {
    this.router.navigate(['/trainer-invoices']);
  }

  viewAllBatches() {
    this.router.navigate(['/batches']);
  }

  logout() {
    this.authService.logout();
  }

  formatPeriod(period: string): string {
    const map: any = {
      lastMonth: 'Last Month',
      lastQuarter: 'Last Quarter',
      lastYear: 'Last Year',
      lifetime: 'Lifetime'
    };
    return map[period] || period;
  }
}
