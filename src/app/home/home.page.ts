import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  username: string = '';
  role: string = ''; 
  clases: any[] = [];

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername(); 
  }
  obtenerRol() {
    this.role = sessionStorage.getItem('role') || ''; 
    console.log('Rol recuperado:', this.role); 
  }
 
  obtenerUsuario() {
    this.username = sessionStorage.getItem('username') || 'Usuario'; 
  }

 
  obtenerAsistencias() {
    const storedAsistencias = localStorage.getItem('asistencias');
    this.clases = storedAsistencias ? JSON.parse(storedAsistencias) : [];
  }

  
  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            sessionStorage.clear(); 
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
