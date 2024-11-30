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
  roleSelected: boolean = false; // Variable para determinar si se seleccionó un rol
  role: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
 

  // Método para regresar a la selección de roles
  resetRole() {
    this.roleSelected = false;
    this.username = '';
    this.password = '';
  }


  selectRole(role: string) {
    this.role = role;        // Establece el rol seleccionado
    this.roleSelected = true; // Cambia el estado para mostrar el formulario de inicio de sesión
  }
  goBackToRoleSelection() {
    this.role = '';          // Reinicia el rol seleccionado
    this.roleSelected = false; // Vuelve al estado de selección de rol
  }

  login() {
    if (this.authService.validateUser(this.username, this.password)) {
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('password', this.password);
      sessionStorage.setItem('role', this.role);  // Almacena el rol en sessionStorage
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
