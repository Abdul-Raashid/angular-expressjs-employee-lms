import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getEarningsSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/earnings-summary`);
  }

  getRecentBatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dashboard/recent-batches`);
  }

  getRecentInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dashboard/recent-invoices`);
  }
}
