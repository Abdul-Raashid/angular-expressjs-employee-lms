import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-batches',
  standalone: true,
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class BatchesComponent implements OnInit {
  upcomingBatches: any[] = [];
  ongoingBatches: any[] = [];
  completedBatches: any[] = [];

  allUpcoming: any[] = [];
  allOngoing: any[] = [];
  allCompleted: any[] = [];

  trainerName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllBatches();
  }

  getAllBatches(): void {
    this.http.get<any[]>('http://localhost:3000/api/batches/upcoming').subscribe(data => {
      this.allUpcoming = data;
      this.filterBatches();
    });

    this.http.get<any[]>('http://localhost:3000/api/batches/ongoing').subscribe(data => {
      this.allOngoing = data;
      this.filterBatches();
    });

    this.http.get<any[]>('http://localhost:3000/api/batches/completed').subscribe(data => {
      this.allCompleted = data;
      this.filterBatches();
    });
  }

  filterBatches(): void {
    const name = this.trainerName.trim().toLowerCase();
    if (!name) {
      this.upcomingBatches = this.allUpcoming;
      this.ongoingBatches = this.allOngoing;
      this.completedBatches = this.allCompleted;
    } else {
      this.upcomingBatches = this.allUpcoming.filter(batch => batch.trainerName?.toLowerCase() === name);
      this.ongoingBatches = this.allOngoing.filter(batch => batch.trainerName?.toLowerCase() === name);
      this.completedBatches = this.allCompleted.filter(batch => batch.trainerName?.toLowerCase() === name);
    }
  }

  goBack(): void {
    this.router.navigate(['/trainer-dashboard']);
  }
}
