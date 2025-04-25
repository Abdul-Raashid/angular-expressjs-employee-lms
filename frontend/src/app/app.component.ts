import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,          // Required for built-in pipes like 'date'
    FormsModule,           // For form support
    HttpClientModule,      // For API calls
    RouterOutlet,          // For routing
    SidebarComponent       // Your custom sidebar component
  ]
})
export class AppComponent {
  title = 'Flexible Cloud Services';
}
