import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Base backend URL (assuming the API is under `/api`)

  constructor(private http: HttpClient) {}

  // Create purchase order
  createPurchaseOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/purchase-orders`, data);
  }

  // Get finance details
getFinanceDetails(): Observable<{
  budget: number;
  totalRevenue: number;
  totalSalaries: number;
  profit: number;
}> {
  return this.http.get<{
    budget: number;
    totalRevenue: number;
    totalSalaries: number;
    profit: number;
  }>(`${this.baseUrl}/dashboard`, {
    withCredentials: true
  });
}


  // Get list of employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employees`);
  }

  // Get list of invoices (Ensure the backend route matches this)
  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/invoices`); // Simplified route
  }
  getEmployeeInvoices() {
    return this.http.get<any[]>(`${this.baseUrl}/employee-invoices/all`);
  }

  getSalarySlips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/salary-slips`);
  }
  
  
  downloadEmployeeInvoice(invoiceNumber: string) {
    return this.http.get(`http://localhost:3000/api/employee-invoices/download/${invoiceNumber}`, {
      responseType: 'blob', // Ensures the response is handled as a blob (binary data)
      withCredentials: true // If you need to send cookies with the request
    });
  }
  
  


  // Pay salary to a specific employee
  paySalary(empId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees/${empId}/pay`, {});
  }





  
}
