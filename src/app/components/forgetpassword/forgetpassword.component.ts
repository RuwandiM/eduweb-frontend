import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  imports: [FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  email='admin@gmail.com';
  password = '';
  confirmPassword = '';

  updatePassword() {

  }

}
