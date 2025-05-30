import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  name='';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  register() {
    if (true) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials');
    }
  }

}
