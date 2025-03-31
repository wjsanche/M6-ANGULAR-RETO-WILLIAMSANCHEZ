import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private cuentaService: CuentaService, private router: Router) {}

  login() {
    if (this.email === 'admin@banco.com' && this.password === '123456') {
      localStorage.setItem('token', 'token-ficticio'); // Simula un token
      this.router.navigate(['/cuenta']); // Redirige a la cuenta
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtelo de nuevo.';
    }
  }
}
