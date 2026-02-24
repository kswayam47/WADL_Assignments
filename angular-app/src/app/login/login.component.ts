import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  login() {
    this.userService.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('userId', res._id || '');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        // Show specific error from backend (e.g. "User not found" or "Incorrect password")
        alert('Login failed: ' + (err.error?.message || 'Connection error'));
      }
    });
  }
}
