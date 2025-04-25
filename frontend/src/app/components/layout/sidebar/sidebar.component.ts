import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';  // Adjust the path based on your folder structure

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  role: string = ''; 
  constructor(private authService: AuthService) {}

  // Call the logout method from the AuthService
  logout() {
    this.authService.logout();
  }
}
