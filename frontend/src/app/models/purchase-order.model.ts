export interface PurchaseOrder {
  courseName: string;
  companyName: string;
  trainerName: string;
  startDate: string;
  numberOfDays: number;
  dailyCost: number;       // renamed from costPerDay
  totalCost: number;
  trainerCost: number;
}
