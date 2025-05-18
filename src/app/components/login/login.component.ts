import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { error } from 'console';

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

  constructor(private loaddingservice: FakeLoadingService,private router: Router) {}

  login() {
    this.loginError = '';

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (this.email.value === storedEmail && this.password.value === storedPassword) {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      this.loaddingservice.loadingWithPromise().then((data: number)=>{
        if(data === 3){
          this.router.navigate(['/profile']);
        }
      }).catch(error=>{
        console.error(error);
        this.isLoading = false;
        this.showLoginForm = true;
        this.loginError = 'Betöltési hiba történt!';  
      }).finally(()=>{
        console.log("Végrehajtódott!");
      });
    } else {
      this.loginError = 'Hibás felhasználó név vagy jelszó!';  
    }
  }

  login2() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';


    this.loaddingservice.loadingWithPromise2(emailValue, passwordValue).then((_: boolean) => {
      console.log("This executed second!");
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/profile');
    }).catch(error => {
      this.isLoading = false;
      this.showLoginForm = true;
      this.loginError = 'Invalid email or password!';
      console.error(error);
    }).finally(() => {
      console.log("This executed finally!");
    });

    console.log("This executed first!");
  }

  async login3() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    try {
      // then
      const bool = await this.loaddingservice.loadingWithPromise3(emailValue, passwordValue);
      console.log(bool, "This executed second!");
      this.isLoading = true;
      this.showLoginForm = false;
      this.router.navigateByUrl('/home');
      localStorage.setItem('isLoggedIn', 'true');
      // catch
    } catch (error) {
      console.error(error)
    }
    // finally
    console.log("This executed finally!");
  }

  

}
