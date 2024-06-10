import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email === 'test@test.com' && this.password === 'password') {
      localStorage.setItem('user', JSON.stringify({ email: this.email }));
      this.router.navigate(['/accounting']);
    } else {
      alert('Invalid credentials');
    }
  }
}