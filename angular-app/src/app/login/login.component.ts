import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router) {}

  login() {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      this.errorMsg = 'No user found. Please register first.';
      return;
    }

    const user = JSON.parse(storedUser);

    if (this.email === user.email && this.password === user.password) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMsg = 'Invalid email or password';
    }
  }
}
