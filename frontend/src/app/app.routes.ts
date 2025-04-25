import { Routes } from '@angular/router';
import { BatchesComponent } from './components/batches/batches.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeSalaryComponent } from './components/employee-salary/employee-salary.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { TrainerInvoicesComponent } from './components/trainer-invoices/trainer-invoices.component';
import { SalarySlipsComponent } from '../app/salary-slips/salary-slips.component';

export const routes: Routes = [
  // 🌐 Public Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🛡️ Admin-Only Routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'employee-salary',
    component: EmployeeSalaryComponent,
    // canActivate: [AuthGuard, RoleGuard],
    //data: { role: 'admin' }
  },

  // 📋 Shared Route (Admin & Trainer can access)
  {
    path: 'invoices',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },

  // 👨‍🏫 Trainer-Only Routes
  {
    path: 'trainer-dashboard',
    component: TrainerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'trainer' }
  },



  {
    path: 'trainer-invoices',
    component: TrainerInvoicesComponent,
    canActivate: [AuthGuard],
    data: { role: 'trainer' }
  },

  {
    path: 'batches',
    component: BatchesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'trainer' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'trainer' }
  },


  {
    path: 'salary-slips',
    component: SalarySlipsComponent // ✅ New public route without guards
  },
  

  // 🚧 Wildcard - Catch-all
  { path: '**', redirectTo: '/login' }
];
