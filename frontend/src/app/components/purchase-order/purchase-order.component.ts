import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Add ReactiveFormsModule
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent {
  poForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.poForm = this.fb.group({
      courseName: [''],
      companyName: [''],
      trainerName: [''],
      startDate: [''],
      numberOfDays: [0],
      dailyCost: [0],
      trainerCost: [],
      
    });
  }

  get totalCost(): number {
    const days = this.poForm.value.numberOfDays;
    const cost = this.poForm.value.costPerDay;
    return days * cost;
  }

  onSubmit() {
    console.log('Submitting form:', this.poForm.value);
  
    const formValue = { ...this.poForm.value, totalCost: this.totalCost };
  
    this.api.createPurchaseOrder(formValue).subscribe({
      next: () => {
        alert('Purchase Order Submitted!');
        location.reload(); // ✅ reload only after success
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to submit Purchase Order.');
      }
    });
  }
  
}
