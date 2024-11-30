import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isAuthenticated = this.checkLogin();
    if (isAuthenticated) {
      return true;  // Si está autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']);  // Redirige a login si no está autenticado
      return false;
    }
  }

  private checkLogin(): boolean {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    // Verifica si el usuario y la contraseña existen en el almacenamiento
    if (username && password) {
      return this.authService.validateUser(username, password);  // Verifica las credenciales
    }
    return false;
  }
}
