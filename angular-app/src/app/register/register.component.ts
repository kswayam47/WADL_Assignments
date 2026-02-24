import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  user: User = {
    name: '',
    email: '',
    password: '',
    year: '',
    department: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  register() {
    console.log('RegisterComponent: Attempting to register user:', {
      name: this.user.name,
      email: this.user.email,
      year: this.user.year,
      department: this.user.department
    });

    this.userService.register(this.user).subscribe({
      next: (res) => {
        console.log('RegisterComponent: Registration SUCCESS. Received:', res);
        localStorage.setItem('userId', res._id || '');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('RegisterComponent: Registration FAILED:', err);
        alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
