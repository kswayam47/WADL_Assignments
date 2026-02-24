import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {

  user: User = { name: '', email: '', year: '', department: '' };

  // Notification system
  notification = { message: '', type: '' }; // type: 'success' | 'error'

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log('ProfileComponent: Attempting to fetch profile for ID:', userId);

    if (!userId) {
      console.warn('ProfileComponent: No user ID found in session.');
      this.router.navigate(['/']);
      return;
    }

    this.userService.getUser(userId).subscribe({
      next: (data) => {
        console.log('ProfileComponent: RECEIVED data from backend:', data);
        this.user = {
          ...data,
          year: data.year || '',
          department: data.department || ''
        };
        console.log('ProfileComponent: Processed user object for UI:', this.user);
      },
      error: (err) => {
        console.error('ProfileComponent: API Fetch Error:', err);
        this.showNotification('Session expired or database error. Please login again.', 'error');
        setTimeout(() => this.logout(), 2000);
      }
    });
  }

  updateProfile() {
    if (this.user._id) {
      console.log('ProfileComponent: SENDING update payload:', {
        id: this.user._id,
        name: this.user.name,
        email: this.user.email,
        year: this.user.year,
        department: this.user.department
      });

      this.userService.updateUser(this.user._id, this.user).subscribe({
        next: (updatedUser) => {
          console.log('ProfileComponent: UPDATE successful. Received:', updatedUser);
          this.user = {
            ...updatedUser,
            year: updatedUser.year || '',
            department: updatedUser.department || ''
          };
          this.showNotification('Profile updated successfully!', 'success');
        },
        error: (err) => {
          console.error('ProfileComponent: Update Error:', err);
          this.showNotification('Update failed: ' + (err.error?.message || 'Server error'), 'error');
        }
      });
    } else {
      console.error('ProfileComponent: Cannot update - Missing user ID');
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = { message: '', type: '' };
    }, 4000);
  }

  deleteAccount() {
    if (this.user._id && confirm('Are you sure you want to permanently delete your account?')) {
      this.userService.deleteUser(this.user._id).subscribe({
        next: () => {
          localStorage.removeItem('userId');
          this.router.navigate(['/register']);
        },
        error: (err) => this.showNotification('Delete operation failed.', 'error')
      });
    }
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
