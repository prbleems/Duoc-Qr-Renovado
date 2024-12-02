import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Asegúrate de tener este servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  roleSelected: boolean = false; 
  role: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
 
  resetRole() {
    this.roleSelected = false;
    this.username = '';
    this.password = '';
  }


  selectRole(role: string) {
    this.role = role;        
    this.roleSelected = true; 
  }
  goBackToRoleSelection() {
    this.role = '';          
    this.roleSelected = false; 
  }

  login() {
    if (this.authService.validateUser(this.username, this.password)) {
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('password', this.password);
      sessionStorage.setItem('role', this.role); 
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
