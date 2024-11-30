import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  username: string = '';
  newPassword: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  restablecerPassword() {
    if (this.authService.changePassword(this.username, this.newPassword)) {
      alert('Contraseña restablecida con éxito');
      this.router.navigate(['/login']);  // Redirige al login
    } else {
      alert('Usuario no encontrado');
    }
  }
}
