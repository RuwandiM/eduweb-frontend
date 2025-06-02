import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import SHA256 from 'crypto-js/sha256';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  http = inject(HttpClient);

  login() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields!');
    } else {
      const user = {
        email: this.email,
        password: SHA256(this.password).toString(),  
      }
      console.log(user);
      this.http.post('http://localhost:8080/user/login', user).subscribe({
        next: (res: any) => {
          console.log('Login successful:', res);
          alert('Login successful!');
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/student']);
        },
        error: (err) => {
          console.error('Error during login:', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      })
    }
  }

}
