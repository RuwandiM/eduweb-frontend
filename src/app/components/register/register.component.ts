import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import SHA256 from 'crypto-js/sha256';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  name='';
  email = '';
  password = '';
  confirmPassword = '';
  id = SHA256(this.email).toString();

  constructor(private router: Router) {}

  http = inject(HttpClient);

  createUser() {
    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: SHA256(this.password).toString(),
      role: 1,
    };
    this.http.post('http://localhost:8080/user', user)
      .subscribe({
        next: (res) => {
          console.log('User created successfully:', res);
          alert('Registration successful!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating user:', err);
          alert('Registration failed. Please try again.');
        }
      });
  }

  register() {
    if(!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields!');
      return; 
    } else if(this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return; 
    } else {
      this.createUser();  
    }
}
}
