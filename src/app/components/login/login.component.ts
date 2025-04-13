import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule 
  ],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;

  constructor(private router: Router) {}

  login() {
    this.loginError = '';

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (this.email.value === storedEmail && this.password.value === storedPassword) {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');
      setTimeout(() => {
        this.router.navigate(['/profile']);
      });
    } else {
      this.loginError = 'Hibás felhasználó név vagy jelszó!';  
    }
  }
}
