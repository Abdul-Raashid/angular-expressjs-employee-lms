import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common'; // 👈 Import Location service

@Component({
  standalone: true,
  selector: 'app-trainer-invoices',
  imports: [CommonModule],
  templateUrl: './trainer-invoices.component.html',
  styleUrls: ['./trainer-invoices.component.scss']
})
export class TrainerInvoicesComponent implements OnInit {
  invoices: any[] = [];

  constructor(private api: ApiService, private location: Location) {}

  ngOnInit(): void {
    this.api.getEmployeeInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  downloadInvoice(invoiceNumber: string) {
    this.api.downloadEmployeeInvoice(invoiceNumber).subscribe((blob) => {
      if (blob.type !== 'application/pdf') {
        alert('Failed to download PDF. The response is not a PDF file.');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoiceNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading invoice:', error);
      alert('Error downloading invoice. Please try again later.');
    });
  }

  goBack() {
    this.location.back();
  }
}
