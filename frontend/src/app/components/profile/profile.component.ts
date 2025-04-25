import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Define the profile object
  profile: { name: string, email: string };

  constructor() {
    // Set default values (can be replaced with real data later)
    this.profile = {
      name: 'John Doe',
      email: 'johndoe@example.com'
    };
  }

  ngOnInit(): void {
    // You can later update this profile with API data or user details.
  }
}
