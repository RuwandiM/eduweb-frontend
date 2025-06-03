import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import SHA256 from 'crypto-js/sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  email='';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  http = inject(HttpClient);

  updatePassword() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields!');
      return;
    } else if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    } else {
      const user = {
        email: this.email,    
        password: SHA256(this.password).toString(),
      };
      this.http.post('http://localhost:8080/user/forgetpassword', user).subscribe({
        next: (res: any) => {
          console.log('Password updated successfully:', res);
          alert('Password updated successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating password:', err);
          alert('Failed to update password. Please try again.');
        }
    })
    }
  } 
}
