import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private baseUrl = 'http://localhost:3000/api/trainer';

  constructor(private http: HttpClient) {}

  getDashboardData(id: string) {
    return this.http.get(`${this.baseUrl}/dashboard/${id}`);
  }
}
