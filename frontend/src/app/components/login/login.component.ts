import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.loading = true;
    console.log('Sending login:', this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        const token = res.token;
        localStorage.setItem('token', token);

        const role = this.getRoleFromToken(token);
        console.log('Extracted role from token:', role);

        // Redirect based on role
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/trainer-dashboard']);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loading = false;
      }
    });
  }

  // Decode JWT and extract role
  getRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
