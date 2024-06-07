import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Örnek kimlik doğrulama işlemi
    if (this.email === 'test@test.com' && this.password === 'password') {
      // Giriş başarılı
      localStorage.setItem('user', JSON.stringify({ email: this.email }));
      this.router.navigate(['/accounting']);
    } else {
      // Giriş başarısız
      alert('Invalid credentials');
    }
  }
}
