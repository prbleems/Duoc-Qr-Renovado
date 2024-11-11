import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; // Inicializa el valor de usuario
  password: string = ''; // Inicializa el valor de la contraseña
  showPassword: boolean = false; // Controla la visibilidad de la contraseña

  constructor(private navCtrl: NavController) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      // Guarda las credenciales en sessionStorage
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('password', this.password);
      
      // Redirige a la página de inicio
      this.navCtrl.navigateForward('/home');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}